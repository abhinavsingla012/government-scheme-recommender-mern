/**
 * Password Utility Module
 * Handles password hashing and verification using bcrypt
 */
const bcrypt = require('bcryptjs');

const SALT_ROUNDS = 10;

const hashPassword = async (plainPassword) => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return bcrypt.hash(plainPassword, salt);
};

const verifyPassword = async (plainPassword, hash) => {
  return bcrypt.compare(plainPassword, hash);
};

module.exports = { hashPassword, verifyPassword };
