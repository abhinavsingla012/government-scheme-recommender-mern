
const mongoose = require('mongoose');

const eligibilitySchema = new mongoose.Schema(
  {
    minAge: { type: Number, default: null },
    maxAge: { type: Number, default: null },
    gender: { type: [String], default: [] }, // empty = any
    maxIncome: { type: Number, default: null }, // annual income cap
    occupations: { type: [String], default: [] },
    education: { type: [String], default: [] },
    states: { type: [String], default: [] }, // empty = pan-india
    categories: { type: [String], default: [] }, // General/OBC/SC/ST/EWS
    disabilityRequired: { type: Boolean, default: false },
    maritalStatus: { type: [String], default: [] },
  },
  { _id: false }
);

const schemeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    ministry: { type: String, default: 'Government of India' },
    category: {
      type: String,
      enum: [
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
      ],
      default: 'Other',
    },
    shortDescription: { type: String, required: true },
    description: { type: String, required: true },
    benefits: { type: [String], default: [] },
    eligibility: { type: eligibilitySchema, default: () => ({}) },
    eligibilityText: { type: String, default: '' },
    documentsRequired: { type: [String], default: [] },
    applicationProcess: { type: String, default: '' },
    applicationUrl: { type: String, default: '' },
    deadline: { type: String, default: 'Ongoing' },
    launchYear: { type: Number, default: null },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Scheme', schemeSchema);
