/**
 * Chatbot Routes
 * POST /api/chatbot/message — AI chatbot endpoint
 * Uses optional authentication: if a valid token is present, user profile
 * is attached for personalized responses; otherwise continues as guest.
 */
const express = require('express');
const { verifyToken } = require('../utils/jwt');
const User = require('../models/User');
const { chat } = require('../controllers/chatbotController');

const router = express.Router();

// Optional auth middleware — does NOT reject if no token is present
const optionalAuth = async (req, _res, next) => {
  try {
    const authHeader = req.headers.authorization || '';
    if (authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      const decoded = verifyToken(token);
      const user = await User.findById(decoded.sub).select('-passwordHash');
      if (user) req.user = user;
    }
  } catch {
    // Token invalid or expired — proceed as guest
  }
  next();
};

router.post('/message', optionalAuth, chat);

module.exports = router;
