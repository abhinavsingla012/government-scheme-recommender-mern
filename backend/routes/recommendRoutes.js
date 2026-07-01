/**
 * Recommendation Routes
 * /api/recommendations/*
 */
const express = require('express');
const router = express.Router();
const { getRecommendations } = require('../controllers/recommendController');
const { authenticate } = require('../middleware/auth');

router.get('/', authenticate, getRecommendations);

module.exports = router;
