const mongoose = require('mongoose');

const WordSchema = new mongoose.Schema({
  word: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  public: { type: Boolean, default: true }
});

module.exports = mongoose.model('Word', WordSchema);
