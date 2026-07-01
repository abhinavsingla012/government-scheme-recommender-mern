
const User = require('../models/User');
const { hashPassword, verifyPassword } = require('../utils/password');
const { createToken } = require('../utils/jwt');

const sanitizeUser = (user) => {
  const obj = user.toObject ? user.toObject() : user;
  delete obj.passwordHash;
  return obj;
};

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email and password are required' });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }
    const normalizedEmail = String(email).toLowerCase().trim();
    const existing = await User.findOne({ email: normalizedEmail });
    if (existing) {
      return res.status(409).json({ error: 'Email already registered' });
    }
    const passwordHash = await hashPassword(password);
    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      passwordHash,
      role: 'user',
    });
    const token = createToken({ sub: user._id.toString(), role: user.role });
    return res.status(201).json({ token, user: sanitizeUser(user) });
  } catch (err) {
    console.error('[Auth] register error:', err);
    return res.status(500).json({ error: 'Registration failed' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    const normalizedEmail = String(email).toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const ok = await verifyPassword(password, user.passwordHash);
    if (!ok) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const token = createToken({ sub: user._id.toString(), role: user.role });
    return res.json({ token, user: sanitizeUser(user) });
  } catch (err) {
    console.error('[Auth] login error:', err);
    return res.status(500).json({ error: 'Login failed' });
  }
};

const me = async (req, res) => {
  return res.json({ user: req.user });
};

module.exports = { register, login, me };
