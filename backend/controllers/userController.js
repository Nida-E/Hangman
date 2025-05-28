import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    console.log('📝 Registration attempt for:', email);

    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({ msg: 'All fields are required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('⚠️ User already exists:', email);
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({
      username,
      email,
      password: hashedPassword
    });

    await user.save();
    console.log('✅ User registered successfully:', email);
    res.status(201).json({ msg: 'User registered successfully' });
    
  } catch (err) {
    console.error('❌ Registration error:', err);
    res.status(500).json({ msg: 'Server error during registration' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log('🔐 Login attempt for:', email);

    // Validation
    if (!email || !password) {
      return res.status(400).json({ msg: 'Email and password are required' });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      console.log('⚠️ User not found:', email);
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('⚠️ Invalid password for:', email);
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || 'fallbacksecret',
      { expiresIn: '24h' }
    );

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    console.log('✅ Login successful for:', email);
    res.status(200).json({ 
      msg: 'Login successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        admin: user.admin
      }
    });
    
  } catch (err) {
    console.error('❌ Login error:', err);
    res.status(500).json({ msg: 'Server error during login' });
  }
};