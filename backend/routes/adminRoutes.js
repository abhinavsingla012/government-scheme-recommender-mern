/**
 * Admin Routes
 * /api/admin/*  (admin-only)
 */
const express = require('express');
const router = express.Router();
const {
  createScheme,
  updateScheme,
  deleteScheme,
  listUsers,
  getUserDetail,
  dashboardStats,
} = require('../controllers/adminController');
const { authenticate, requireAdmin } = require('../middleware/auth');

router.use(authenticate, requireAdmin);

router.get('/stats', dashboardStats);
router.get('/users', listUsers);
router.get('/users/:id', getUserDetail);
router.post('/schemes', createScheme);
router.put('/schemes/:id', updateScheme);
router.delete('/schemes/:id', deleteScheme);

module.exports = router;
