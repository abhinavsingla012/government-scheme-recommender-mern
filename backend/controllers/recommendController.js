/**
 * Recommendation Controller
 * Uses the recommender engine to return personalized scheme suggestions
 */
const Scheme = require('../models/Scheme');
const { recommendSchemes } = require('../utils/recommender');

const getRecommendations = async (req, res) => {
  try {
    const profile = req.user.profile || {};
    const hasProfile =
      profile.age != null ||
      profile.annualIncome != null ||
      profile.state ||
      profile.gender ||
      profile.category;

    if (!hasProfile) {
      return res.status(200).json({
        results: [],
        profileIncomplete: true,
        message: 'Please complete your profile to get personalized recommendations.',
      });
    }

    const schemes = await Scheme.find({ isActive: true });
    const results = recommendSchemes(profile, schemes);

    // Only return top-ranked results (eligible + high partial matches)
    const filtered = results.filter((r) => r.eligible || r.score >= 50);

    return res.json({
      results: filtered,
      total: filtered.length,
      profileIncomplete: false,
    });
  } catch (err) {
    console.error('[Recommend] error:', err);
    return res.status(500).json({ error: 'Failed to generate recommendations' });
  }
};

module.exports = { getRecommendations };
