/**
 * User Model
 * Represents a registered user (citizen or admin)
 */
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    profile: {
      age: { type: Number, default: null },
      gender: { type: String, enum: ['male', 'female', 'other', null], default: null },
      occupation: { type: String, default: null },
      annualIncome: { type: Number, default: null },
      education: { type: String, default: null },
      state: { type: String, default: null },
      district: { type: String, default: null },
      category: {
        type: String,
        enum: ['General', 'OBC', 'SC', 'ST', 'EWS', null],
        default: null,
      },
      maritalStatus: { type: String, default: null },
      disability: { type: Boolean, default: false },
    },
    bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Scheme' }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
