/**
 * Chatbot Controller
 * AI-powered chatbot using Groq API to help users discover government schemes.
 * Features: scheme-aware system prompt, optional user profile injection,
 *           in-memory rate limiting, and scheme data caching.
 */
const Groq = require('groq-sdk');
const Scheme = require('../models/Scheme');
const User = require('../models/User');

// ── Groq client ──────────────────────────────────────────────
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const MODEL = 'llama-3.3-70b-versatile';

// ── Scheme cache (10 min TTL) ────────────────────────────────
let schemeCache = null;
let schemeCacheTime = 0;
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

async function getCachedSchemes() {
  const now = Date.now();
  if (schemeCache && now - schemeCacheTime < CACHE_TTL) return schemeCache;

  const schemes = await Scheme.find({ isActive: true }).lean();
  schemeCache = schemes.map((s) => ({
    name: s.name,
    category: s.category,
    ministry: s.ministry,
    shortDescription: s.shortDescription,
    benefits: s.benefits,
    eligibilityText: s.eligibilityText,
    documentsRequired: s.documentsRequired,
    applicationProcess: s.applicationProcess,
    applicationUrl: s.applicationUrl,
    deadline: s.deadline,
  }));
  schemeCacheTime = now;
  return schemeCache;
}

// ── Rate limiter (in-memory, per IP) ─────────────────────────
const rateLimitMap = new Map();
const RATE_WINDOW = 5 * 60 * 1000; // 5 minutes
const RATE_MAX = 30; // max messages per window

function checkRateLimit(key) {
  const now = Date.now();
  let entry = rateLimitMap.get(key);
  if (!entry || now - entry.windowStart > RATE_WINDOW) {
    entry = { windowStart: now, count: 0 };
    rateLimitMap.set(key, entry);
  }
  entry.count++;
  return entry.count <= RATE_MAX;
}

// Periodically clean stale entries (every 10 min)
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitMap) {
    if (now - entry.windowStart > RATE_WINDOW) rateLimitMap.delete(key);
  }
}, 10 * 60 * 1000);

// ── Build system prompt ──────────────────────────────────────
function buildSystemPrompt(schemes, userProfile) {
  const schemeSummaries = schemes
    .map(
      (s, i) =>
        `${i + 1}. **${s.name}** [${s.category}]\n` +
        `   ${s.shortDescription}\n` +
        `   Benefits: ${s.benefits.join('; ')}\n` +
        `   Eligibility: ${s.eligibilityText}\n` +
        `   Documents: ${s.documentsRequired.join(', ')}\n` +
        `   How to apply: ${s.applicationProcess}\n` +
        `   Official link: ${s.applicationUrl}\n` +
        `   Deadline: ${s.deadline}`
    )
    .join('\n\n');

  let profileSection = '';
  if (userProfile) {
    const p = userProfile;
    profileSection = `
── CURRENT USER PROFILE ──
The user is logged in. Use this info to give personalized recommendations:
- Name: ${p.name || 'Not provided'}
- Age: ${p.age ?? 'Not provided'}
- Gender: ${p.gender || 'Not provided'}
- Occupation: ${p.occupation || 'Not provided'}
- Annual Income: ${p.annualIncome != null ? '₹' + p.annualIncome.toLocaleString('en-IN') : 'Not provided'}
- Education: ${p.education || 'Not provided'}
- State: ${p.state || 'Not provided'}
- Category: ${p.category || 'Not provided'}
- Disability: ${p.disability ? 'Yes' : 'No'}
- Marital Status: ${p.maritalStatus || 'Not provided'}

When the user asks about eligibility, compare their profile details against scheme requirements and give a clear yes/no/maybe answer.
`;
  } else {
    profileSection = `
── VISITOR (NOT LOGGED IN) ──
The user has NOT logged in. When relevant:
- Encourage them to register on the platform to get personalized scheme recommendations
- Explain that registration is free and takes only 2 minutes
- Explain the benefits of creating an account (personalized matching, eligibility checking, etc.)
- You can still answer general questions about schemes, documents, and application processes
`;
  }

  return `You are **Yojana Sahayak AI Assistant**, a helpful chatbot on the Yojana Sahayak Government Scheme Recommender platform.

YOUR PURPOSE:
- Help Indian citizens discover government schemes they are eligible for
- Provide information about scheme benefits, eligibility, required documents, and application processes
- Guide users on how to use the Yojana Sahayak platform
- For logged-in users, give personalized scheme recommendations based on their profile

RULES:
1. Only answer questions related to Indian government schemes, welfare programs, subsidies, the Yojana Sahayak platform, or general guidance on government benefits.
2. If asked about unrelated topics (weather, sports, coding, etc.), politely decline and redirect to scheme-related help.
3. Always be helpful, respectful, and use simple language that is easy to understand.
4. When recommending schemes, mention the scheme name, key benefits, and how to apply.
5. If you're unsure about something, say so rather than making up information.
6. Keep responses concise but informative. Use bullet points for lists.
7. When mentioning application URLs, include them so users can click through.
8. Respond in the same language the user writes in (Hindi, English, etc.) but default to English.

ABOUT THE PLATFORM:
- Yojana Sahayak is a free online platform that matches citizen profiles with eligible government schemes
- Users can register, fill their profile (age, gender, income, occupation, state, category), and get personalized recommendations
- The platform lists 25+ central government schemes across categories like Agriculture, Education, Health, Housing, Employment, Financial, Women & Child, Skill Development, etc.
- Direct links to official government portals are provided for each scheme

${profileSection}

── SCHEME DATABASE (${schemes.length} active schemes) ──
${schemeSummaries}
`;
}

// ── Chat endpoint ────────────────────────────────────────────
const chat = async (req, res) => {
  try {
    // Rate limit by IP (or user ID if logged in)
    const rateLimitKey = req.user ? `user:${req.user._id}` : `ip:${req.ip}`;
    if (!checkRateLimit(rateLimitKey)) {
      return res.status(429).json({
        error: 'Too many messages. Please wait a few minutes before trying again.',
      });
    }

    const { message, history } = req.body;
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({ error: 'Message is required' });
    }
    if (message.length > 1000) {
      return res.status(400).json({ error: 'Message is too long (max 1000 characters)' });
    }

    // Fetch scheme data (cached)
    const schemes = await getCachedSchemes();

    // Fetch user profile if authenticated
    let userProfile = null;
    if (req.user) {
      userProfile = req.user.toObject ? req.user.toObject() : req.user;
    }

    // Build conversation messages
    const systemPrompt = buildSystemPrompt(schemes, userProfile);

    const messages = [{ role: 'system', content: systemPrompt }];

    // Add conversation history (last 10 exchanges max)
    if (Array.isArray(history)) {
      const trimmedHistory = history.slice(-20); // 10 user + 10 assistant
      for (const msg of trimmedHistory) {
        if (msg.role === 'user' || msg.role === 'assistant') {
          messages.push({ role: msg.role, content: msg.content });
        }
      }
    }

    // Add current message
    messages.push({ role: 'user', content: message.trim() });

    // Call Groq
    const completion = await groq.chat.completions.create({
      model: MODEL,
      messages,
      temperature: 0.7,
      max_tokens: 1024,
      top_p: 1,
    });

    const reply =
      completion.choices?.[0]?.message?.content || 'I apologize, I could not generate a response. Please try again.';

    res.json({ reply });
  } catch (err) {
    console.error('[Chatbot] Error:', err.message || err);
    if (err.status === 429 || err.statusCode === 429) {
      return res.status(429).json({
        error: 'The AI service is temporarily busy. Please try again in a moment.',
      });
    }
    res.status(500).json({ error: 'Failed to get a response from the AI assistant.' });
  }
};

module.exports = { chat };
