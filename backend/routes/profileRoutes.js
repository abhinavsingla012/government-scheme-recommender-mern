/**
 * Profile Routes
 * /api/profile/*
 */
const express = require('express');
const router = express.Router();
const {
  getProfile,
  updateProfile,
  toggleBookmark,
  getBookmarks,
} = require('../controllers/profileController');
const { authenticate } = require('../middleware/auth');

router.get('/', authenticate, getProfile);
router.put('/', authenticate, updateProfile);
router.get('/bookmarks', authenticate, getBookmarks);
router.post('/bookmarks/:schemeId', authenticate, toggleBookmark);

module.exports = router;
