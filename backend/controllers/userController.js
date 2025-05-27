const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const exist = await User.findOne({ email });
    if (exist) return res.status(400).json({ msg: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword
    });

    await user.save();
    res.status(201).json({ msg: 'User registered' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) return res.status(400).json({ msg: 'User does not exist' });

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

      // const token = ;

      const token = jwt.sign(
        { id: user._id,
          admin: user.admin
         },
        process.env.JWT_SECRET || 'fallbacksecret',
        { expiresIn: '1h' }
      );
    
      res.status(200).json({ 
        token,
        user: {
          id: user._id,
          email: user.email,
          username: user.username
        }
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'Server error' });
    }
};

exports.adminRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const exist = await User.findOne({ email });
    if (exist) return res.status(400).json({ msg: 'Admin already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword,
      admin: true
    });

    await user.save();
    res.status(201).json({ msg: 'Admin registered' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};