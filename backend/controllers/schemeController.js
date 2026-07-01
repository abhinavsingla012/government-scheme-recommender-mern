/**
 * Scheme Controller
 * Public endpoints: list all schemes, get single scheme, search/filter
 */
const Scheme = require('../models/Scheme');

const listSchemes = async (req, res) => {
  try {
    const { category, search, state } = req.query;
    const query = { isActive: true };
    if (category && category !== 'all') query.category = category;
    if (state) query['eligibility.states'] = { $in: ['', state] };
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { shortDescription: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }
    const schemes = await Scheme.find(query).sort({ createdAt: -1 });
    return res.json({ schemes });
  } catch (err) {
    console.error('[Scheme] list error:', err);
    return res.status(500).json({ error: 'Failed to fetch schemes' });
  }
};

const getScheme = async (req, res) => {
  try {
    const scheme = await Scheme.findById(req.params.id);
    if (!scheme) return res.status(404).json({ error: 'Scheme not found' });
    return res.json({ scheme });
  } catch (err) {
    console.error('[Scheme] get error:', err);
    return res.status(500).json({ error: 'Failed to fetch scheme' });
  }
};

const getCategories = async (req, res) => {
  const categories = [
    'Agriculture',
    'Education',
    'Health',
    'Housing',
    'Employment',
    'Financial',
    'Women & Child',
    'Social Welfare',
    'Skill Development',
    'Senior Citizen',
    'Rural Development',
    'Other',
  ];
  return res.json({ categories });
};

module.exports = { listSchemes, getScheme, getCategories };
