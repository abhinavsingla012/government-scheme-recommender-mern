/**
 * Main Server Entry Point
 * Express + MongoDB backend for AI-Powered Government Scheme Recommender
 */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const connectDB = require('./config/database');
const { runSeeds } = require('./seeds');

const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const schemeRoutes = require('./routes/schemeRoutes');
const recommendRoutes = require('./routes/recommendRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
const PORT = process.env.PORT || 8001;

// Middleware
app.use(
  cors({
    origin: (process.env.CORS_ORIGINS || '*').split(','),
    credentials: false,
  })
);
app.use(express.json({ limit: '2mb' }));
app.use(morgan('tiny'));

// Health check
app.get('/api/', (req, res) => {
  res.json({ message: 'Government Scheme Recommender API', status: 'ok' });
});
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Route modules
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/schemes', schemeRoutes);
app.use('/api/recommendations', recommendRoutes);
app.use('/api/admin', adminRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('[Server] Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
const start = async () => {
  await connectDB();
  await runSeeds();
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Server] Running on 0.0.0.0:${PORT}`);
  });
};

start();
