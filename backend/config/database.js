/**
 * Database Configuration Module
 * Handles MongoDB connection using Mongoose
 */
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoUrl = process.env.MONGO_URL;
    const dbName = process.env.DB_NAME;

    await mongoose.connect(mongoUrl, {
      dbName: dbName,
    });

    console.log(`[DB] MongoDB connected: ${dbName}`);
  } catch (error) {
    console.error('[DB] Connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
