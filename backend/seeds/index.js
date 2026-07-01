/**
 * Seed Module
 * Idempotent seeding of admin user, scheme catalog, and dummy citizens on server startup.
 */
const User = require('../models/User');
const Scheme = require('../models/Scheme');
const { hashPassword, verifyPassword } = require('../utils/password');
const schemesData = require('./schemesData');
const dummyUsers = require('./dummyUsers');

const DUMMY_USER_PASSWORD = 'User@123';

const seedAdmin = async () => {
  const email = (process.env.ADMIN_EMAIL || 'admin@scheme.gov.in').toLowerCase();
  const password = process.env.ADMIN_PASSWORD || 'Admin@123';
  const name = process.env.ADMIN_NAME || 'System Administrator';

  const existing = await User.findOne({ email });
  if (!existing) {
    const passwordHash = await hashPassword(password);
    await User.create({ name, email, passwordHash, role: 'admin' });
    console.log(`[Seed] Admin created: ${email}`);
  } else {
    const ok = await verifyPassword(password, existing.passwordHash);
    if (!ok) {
      existing.passwordHash = await hashPassword(password);
      existing.role = 'admin';
      await existing.save();
      console.log(`[Seed] Admin password refreshed: ${email}`);
    } else {
      console.log(`[Seed] Admin already exists: ${email}`);
    }
  }
};

const seedSchemes = async () => {
  const count = await Scheme.countDocuments();
  if (count > 0) {
    console.log(`[Seed] Schemes already present (${count})`);
    return;
  }
  await Scheme.insertMany(schemesData);
  console.log(`[Seed] Inserted ${schemesData.length} schemes`);
};

const seedDummyUsers = async () => {
  // Build a name → _id map from all schemes
  const allSchemes = await Scheme.find({}, { _id: 1, name: 1 });
  const schemeMap = new Map(allSchemes.map((s) => [s.name, s._id]));

  const passwordHash = await hashPassword(DUMMY_USER_PASSWORD);
  let created = 0;
  for (const u of dummyUsers) {
    const email = u.email.toLowerCase();
    const existing = await User.findOne({ email });
    if (existing) continue;

    const bookmarks = (u.bookmarkNames || [])
      .map((n) => schemeMap.get(n))
      .filter(Boolean);

    await User.create({
      name: u.name,
      email,
      passwordHash,
      role: 'user',
      profile: u.profile,
      bookmarks,
    });
    created++;
  }
  console.log(`[Seed] Dummy users: ${created} created, ${dummyUsers.length - created} already present`);
};

const runSeeds = async () => {
  try {
    await seedAdmin();
    await seedSchemes();
    await seedDummyUsers();
  } catch (err) {
    console.error('[Seed] error:', err);
  }
};

module.exports = { runSeeds, seedAdmin, seedSchemes, seedDummyUsers };
