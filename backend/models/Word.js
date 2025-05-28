import mongoose from 'mongoose';

const WordSchema = new mongoose.Schema({
  word: { 
    type: String, 
    required: true,
    trim: true,
    lowercase: true
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  public: { 
    type: Boolean, 
    default: true 
  }
}, {
  timestamps: true
});

// Index for faster searches
WordSchema.index({ word: 1 });

export default mongoose.model('Word', WordSchema);