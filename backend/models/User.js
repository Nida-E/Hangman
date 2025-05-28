import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  admin: { 
    type: Boolean, 
    default: false 
  },
  username: { 
    type: String, 
    required: true,
    trim: true
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    trim: true
  },
  password: { 
    type: String, 
    required: true 
  },
  solved: [{ 
    type: String 
  }],
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  score: { 
    type: Number, 
    default: 0 
  },
  lastLogin: { 
    type: Date 
  }
});

export default mongoose.model('User', UserSchema);