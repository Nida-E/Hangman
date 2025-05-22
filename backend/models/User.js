const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  admin: { type: Boolean, default: false },
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  solved: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
  score: { type: Number, default: 0 },
  lastLogin: { type: Date }
});

module.exports = mongoose.model('User', UserSchema);
