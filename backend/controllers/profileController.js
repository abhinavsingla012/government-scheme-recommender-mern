/**
 * Profile Controller
 * Handles user profile updates (age, gender, occupation, income, etc.)
 */
const User = require('../models/User');

const getProfile = async (req, res) => {
  return res.json({ profile: req.user.profile, user: req.user });
};

const updateProfile = async (req, res) => {
  try {
    const allowed = [
      'age',
      'gender',
      'occupation',
      'annualIncome',
      'education',
      'state',
      'district',
      'category',
      'maritalStatus',
      'disability',
    ];
    const updates = {};
    for (const key of allowed) {
      if (req.body[key] !== undefined) {
        updates[`profile.${key}`] = req.body[key];
      }
    }
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updates },
      { new: true }
    ).select('-passwordHash');
    return res.json({ profile: user.profile, user });
  } catch (err) {
    console.error('[Profile] update error:', err);
    return res.status(500).json({ error: 'Failed to update profile' });
  }
};

const toggleBookmark = async (req, res) => {
  try {
    const { schemeId } = req.params;
    const user = await User.findById(req.user._id);
    const idx = user.bookmarks.findIndex((b) => b.toString() === schemeId);
    if (idx >= 0) {
      user.bookmarks.splice(idx, 1);
    } else {
      user.bookmarks.push(schemeId);
    }
    await user.save();
    return res.json({ bookmarks: user.bookmarks });
  } catch (err) {
    console.error('[Profile] bookmark error:', err);
    return res.status(500).json({ error: 'Failed to toggle bookmark' });
  }
};

const getBookmarks = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('bookmarks');
    return res.json({ bookmarks: user.bookmarks });
  } catch (err) {
    console.error('[Profile] getBookmarks error:', err);
    return res.status(500).json({ error: 'Failed to fetch bookmarks' });
  }
};

module.exports = { getProfile, updateProfile, toggleBookmark, getBookmarks };
