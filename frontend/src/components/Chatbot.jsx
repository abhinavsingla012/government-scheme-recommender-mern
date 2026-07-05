/**
 * Chatbot Component
 * Floating AI assistant widget powered by Groq.
 * Available on every page for both guests and logged-in users.
 */
import { useState, useRef, useEffect, useCallback } from "react";
import { MessageSquare, X, Send, Sparkles } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import api from "../lib/api";
import "./Chatbot.css";

/** Build a personalized welcome message based on auth state */
function getWelcomeMessage(user) {
  const greeting = user
    ? `Namaste, **${user.name || "there"}**! 🙏`
    : "Namaste! 🙏";

  const extra = user
    ? ""
    : "\n• Learn how this platform can benefit you";

  return {
    role: "assistant",
    content:
      `${greeting} I'm **Yojana Sahayak AI Assistant**. I can help you:\n\n` +
      "• Find government schemes you're eligible for\n" +
      "• Explain scheme benefits & eligibility criteria\n" +
      "• Guide you on documents needed & how to apply\n" +
      extra +
      "\n\nHow can I help you today?",
  };
}

const SUGGESTIONS_GUEST = [
  "What is Yojana Sahayak?",
  "How can this website help me?",
  "Tell me about PM Kisan",
  "Schemes for women",
  "Schemes for farmers",
];

const SUGGESTIONS_USER = [
  "What schemes am I eligible for?",
  "Tell me about PM Kisan",
  "How to apply for Ayushman Bharat?",
  "Schemes for women",
  "Schemes for farmers",
];

/** Simple markdown-like formatting for AI responses */
function formatMessage(text) {
  if (!text) return "";
  let html = text
    // Bold: **text** or __text__
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/__(.*?)__/g, "<strong>$1</strong>")
    // Italic: *text* or _text_ (but not inside bold)
    .replace(/(?<!\*)\*(?!\*)(.*?)(?<!\*)\*(?!\*)/g, "<em>$1</em>")
    // Markdown links: [text](url)
    .replace(
      /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
    )
    // Strip any raw HTML anchor tags the AI might output
    .replace(
      /<a\s+href="(https?:\/\/[^"]+)"[^>]*>(.*?)<\/a>/gi,
      '<a href="$1" target="_blank" rel="noopener noreferrer">$2</a>'
    )
    // Bare URLs (not already inside an href="...")
    .replace(
      /(?<!href=")(https?:\/\/[^\s<)"]+)/g,
      '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
    )
    // Line breaks
    .replace(/\n/g, "<br/>");

  // Convert bullet lists: lines starting with - or •
  html = html.replace(
    /(?:(?:^|<br\/>)\s*[-•]\s+.+(?:<br\/>|$))+/g,
    (match) => {
      const items = match
        .split(/<br\/>/)
        .filter((l) => l.trim())
        .map((l) => `<li>${l.replace(/^\s*[-•]\s+/, "")}</li>`)
        .join("");
      return `<ul>${items}</ul>`;
    }
  );

  // Convert numbered lists: lines starting with 1. 2. etc
  html = html.replace(
    /(?:(?:^|<br\/>)\s*\d+\.\s+.+(?:<br\/>|$))+/g,
    (match) => {
      const items = match
        .split(/<br\/>/)
        .filter((l) => l.trim())
        .map((l) => `<li>${l.replace(/^\s*\d+\.\s+/, "")}</li>`)
        .join("");
      return `<ol>${items}</ol>`;
    }
  );

  return html;
}

const Chatbot = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([getWelcomeMessage(null)]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasInteracted, setHasInteracted] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const suggestions = user ? SUGGESTIONS_USER : SUGGESTIONS_GUEST;

  // Reset conversation when user logs in/out so the greeting updates
  useEffect(() => {
    setMessages([getWelcomeMessage(user)]);
    setHasInteracted(false);
    setError("");
  }, [user]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const sendMessage = useCallback(
    async (text) => {
      const trimmed = (text || input).trim();
      if (!trimmed || loading) return;

      setHasInteracted(true);
      setError("");
      setInput("");

      const userMsg = { role: "user", content: trimmed };
      setMessages((prev) => [...prev, userMsg]);
      setLoading(true);

      try {
        // Build history (exclude the welcome message at index 0, send last 20)
        const history = [...messages.slice(1), userMsg].slice(-20);

        const { data } = await api.post("/chatbot/message", {
          message: trimmed,
          history,
        });

        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.reply },
        ]);
      } catch (err) {
        const errMsg =
          err.response?.data?.error ||
          "Sorry, I couldn't get a response. Please try again.";
        setError(errMsg);
      } finally {
        setLoading(false);
      }
    },
    [input, loading, messages]
  );

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleChipClick = (text) => {
    sendMessage(text);
  };

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      {/* ── Chat Window ────────────────────────────────────── */}
      {isOpen && (
        <div className="chatbot-window" id="chatbot-window">
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-header-avatar">
              <Sparkles />
            </div>
            <div className="chatbot-header-info">
              <div className="chatbot-header-title">Yojana Sahayak AI</div>
              <div className="chatbot-header-status">Online — Ask me anything</div>
            </div>
            <button
              className="chatbot-close-btn"
              onClick={toggleChat}
              aria-label="Close chat"
            >
              <X />
            </button>
          </div>

          {/* Messages */}
          <div className="chatbot-messages" id="chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chatbot-msg ${msg.role}`}>
                <div
                  className="chatbot-msg-bubble"
                  dangerouslySetInnerHTML={{
                    __html: formatMessage(msg.content),
                  }}
                />
              </div>
            ))}

            {/* Suggestion chips — show after welcome if no interaction yet */}
            {!hasInteracted && messages.length === 1 && (
              <div className="chatbot-suggestions">
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    className="chatbot-chip"
                    onClick={() => handleChipClick(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Typing indicator */}
            {loading && (
              <div className="chatbot-typing">
                <div className="chatbot-typing-bubble">
                  <div className="chatbot-typing-dot" />
                  <div className="chatbot-typing-dot" />
                  <div className="chatbot-typing-dot" />
                </div>
              </div>
            )}

            {/* Error */}
            {error && <div className="chatbot-error">{error}</div>}

            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="chatbot-input-area">
            <input
              ref={inputRef}
              className="chatbot-input"
              type="text"
              placeholder={
                user
                  ? "Ask about schemes, eligibility..."
                  : "Ask about government schemes..."
              }
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
              maxLength={1000}
              id="chatbot-input"
            />
            <button
              className="chatbot-send-btn"
              onClick={() => sendMessage()}
              disabled={!input.trim() || loading}
              aria-label="Send message"
              id="chatbot-send"
            >
              <Send />
            </button>
          </div>

          {/* Footer badge */}
          <div className="chatbot-powered">
            Powered by <span>AI</span> • Yojana Sahayak
          </div>
        </div>
      )}

      {/* ── Floating Bubble ────────────────────────────────── */}
      {!isOpen && !hasInteracted && (
        <div className="chatbot-tooltip" onClick={toggleChat}>
          {user ? `Hi ${user.name?.split(" ")[0] || "there"}! Need help? 💬` : "Need help? Talk to me! 💬"}
        </div>
      )}
      <button
        className={`chatbot-bubble ${isOpen ? "open" : ""}`}
        onClick={toggleChat}
        aria-label={isOpen ? "Close chat" : "Open AI assistant"}
        id="chatbot-bubble"
      >
        {isOpen ? <X /> : <MessageSquare />}
        {!isOpen && !hasInteracted && <div className="chatbot-bubble-dot" />}
      </button>
    </>
  );
};

export default Chatbot;
