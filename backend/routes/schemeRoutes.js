/**
 * Scheme Routes
 * /api/schemes/*  (public)
 */
const express = require('express');
const router = express.Router();
const {
  listSchemes,
  getScheme,
  getCategories,
} = require('../controllers/schemeController');

router.get('/', listSchemes);
router.get('/categories', getCategories);
router.get('/:id', getScheme);

module.exports = router;
