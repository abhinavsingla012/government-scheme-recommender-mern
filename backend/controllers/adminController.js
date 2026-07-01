/**
 * Admin Controller
 * Admin-only operations: CRUD schemes, view users (with per-user detail), dashboard stats
 */
const Scheme = require('../models/Scheme');
const User = require('../models/User');
const { recommendSchemes } = require('../utils/recommender');

const createScheme = async (req, res) => {
  try {
    const scheme = await Scheme.create(req.body);
    return res.status(201).json({ scheme });
  } catch (err) {
    console.error('[Admin] createScheme error:', err);
    return res.status(400).json({ error: err.message });
  }
};

const updateScheme = async (req, res) => {
  try {
    const scheme = await Scheme.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!scheme) return res.status(404).json({ error: 'Scheme not found' });
    return res.json({ scheme });
  } catch (err) {
    console.error('[Admin] updateScheme error:', err);
    return res.status(400).json({ error: err.message });
  }
};

const deleteScheme = async (req, res) => {
  try {
    const scheme = await Scheme.findByIdAndDelete(req.params.id);
    if (!scheme) return res.status(404).json({ error: 'Scheme not found' });
    return res.json({ success: true });
  } catch (err) {
    console.error('[Admin] deleteScheme error:', err);
    return res.status(500).json({ error: 'Failed to delete scheme' });
  }
};

const listUsers = async (req, res) => {
  try {
    const users = await User.find({ role: 'user' })
      .select('-passwordHash')
      .sort({ createdAt: -1 })
      .lean();

    const schemes = await Scheme.find({ isActive: true });

    // Compute eligible count and bookmarks count for each user
    const enriched = users.map((u) => {
      const results = recommendSchemes(u.profile || {}, schemes);
      const eligibleCount = results.filter((r) => r.eligible).length;
      return {
        ...u,
        eligibleCount,
        bookmarksCount: (u.bookmarks || []).length,
        profileComplete: !!(
          u.profile?.age &&
          u.profile?.state &&
          (u.profile?.annualIncome != null || u.profile?.annualIncome === 0)
        ),
      };
    });

    return res.json({ users: enriched });
  } catch (err) {
    console.error('[Admin] listUsers error:', err);
    return res.status(500).json({ error: 'Failed to fetch users' });
  }
};

const getUserDetail = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-passwordHash')
      .populate('bookmarks')
      .lean();

    if (!user) return res.status(404).json({ error: 'User not found' });

    const schemes = await Scheme.find({ isActive: true });
    const results = recommendSchemes(user.profile || {}, schemes);
    const eligibleSchemes = results.filter((r) => r.eligible);
    const partialSchemes = results.filter((r) => !r.eligible && r.score >= 50);

    return res.json({
      user,
      eligibleSchemes,
      partialSchemes,
      bookmarks: user.bookmarks || [],
      stats: {
        eligibleCount: eligibleSchemes.length,
        partialCount: partialSchemes.length,
        bookmarksCount: (user.bookmarks || []).length,
      },
    });
  } catch (err) {
    console.error('[Admin] getUserDetail error:', err);
    return res.status(500).json({ error: 'Failed to fetch user details' });
  }
};

const dashboardStats = async (req, res) => {
  try {
    const [totalSchemes, activeSchemes, totalUsers, categoryAgg] = await Promise.all([
      Scheme.countDocuments(),
      Scheme.countDocuments({ isActive: true }),
      User.countDocuments({ role: 'user' }),
      Scheme.aggregate([
        { $group: { _id: '$category', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),
    ]);
    return res.json({
      totalSchemes,
      activeSchemes,
      totalUsers,
      categoryBreakdown: categoryAgg.map((c) => ({ category: c._id, count: c.count })),
    });
  } catch (err) {
    console.error('[Admin] stats error:', err);
    return res.status(500).json({ error: 'Failed to fetch stats' });
  }
};

module.exports = {
  createScheme,
  updateScheme,
  deleteScheme,
  listUsers,
  getUserDetail,
  dashboardStats,
};
