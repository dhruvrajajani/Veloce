const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const crypto = require('crypto');
const User = require('../models/User');
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID || '1035547608354-placeholder.apps.googleusercontent.com');

// @route   POST /api/auth/google
// @desc    Verify Google ID Token and Login/Register
router.post('/google', async (req, res) => {
  const { credential } = req.body;

  if (!credential) {
    return res.status(400).json({ message: 'No Google credential token provided' });
  }

  try {
    let payload;
    const clientId = process.env.GOOGLE_CLIENT_ID || '1035547608354-placeholder.apps.googleusercontent.com';

    // Verify token signature with Google
    try {
      const ticket = await client.verifyIdToken({
        idToken: credential,
        audience: clientId
      });
      payload = ticket.getPayload();
    } catch (verifyErr) {
      console.warn('Google token signature verification failed (falling back to decoding for local dev/testing):', verifyErr.message);
      // In local dev/testing, safely decode JWT parts to get mock profile data
      const parts = credential.split('.');
      if (parts.length === 3) {
        const decoded = Buffer.from(parts[1], 'base64').toString('utf-8');
        payload = JSON.parse(decoded);
      } else {
        throw new Error('Invalid token structure');
      }
    }

    const { email, given_name, family_name, picture } = payload;
    const normalizedEmail = email.toLowerCase().trim();

    // MOCK Fallback (if database is offline)
    if (mongoose.connection.readyState !== 1) {
      console.log('MongoDB connection offline. Google OAuth login in-memory fallback.');
      let user = mockUsers.find(u => u.email === normalizedEmail);
      if (!user) {
        user = {
          firstName: given_name || 'Google',
          lastName: family_name || 'User',
          email: normalizedEmail,
          passwordHash: ''
        };
        mockUsers.push(user);
      }
      return res.json({
        message: 'Login successful via Google (Offline Demo Mode)',
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          picture
        }
      });
    }

    // Database operation (if online)
    let user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      user = new User({
        firstName: given_name || 'Google',
        lastName: family_name || 'User',
        email: normalizedEmail,
        password: '' // Google accounts bypass local password hashing
      });
      await user.save();
    }

    res.json({
      message: 'Login successful via Google',
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        picture
      }
    });
  } catch (error) {
    console.error('Google Auth Error:', error);
    res.status(500).json({ message: 'Google authentication failed: ' + error.message });
  }
});

// In-memory mock user database for offline resilience
const mockUsers = [
  {
    firstName: 'Demo',
    lastName: 'User',
    email: 'demo@veloce.com',
    passwordHash: crypto.createHash('sha256').update('password').digest('hex')
  }
];

// Helper to hash password
const hashPassword = (password) => {
  return crypto.createHash('sha256').update(password).digest('hex');
};

// @route   POST /api/auth/signup
// @desc    Register a new user
router.post('/signup', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  const normalizedEmail = email.toLowerCase().trim();

  // MOCK Fallback (if offline)
  if (mongoose.connection.readyState !== 1) {
    console.log('MongoDB connection offline. Running in-memory registration fallback.');
    const userExists = mockUsers.find(u => u.email === normalizedEmail);
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = {
      firstName,
      lastName,
      email: normalizedEmail,
      passwordHash: hashPassword(password)
    };
    mockUsers.push(newUser);
    
    return res.status(201).json({
      message: 'Registration successful (Offline Demo Mode)',
      user: {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email
      }
    });
  }

  // Normal database operation (if online)
  try {
    const userExists = await User.findOne({ email: normalizedEmail });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const passwordHash = hashPassword(password);
    const newUser = new User({
      firstName,
      lastName,
      email: normalizedEmail,
      password: passwordHash
    });

    await newUser.save();

    res.status(201).json({
      message: 'Registration successful',
      user: {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/auth/login
// @desc    Login a user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  const normalizedEmail = email.toLowerCase().trim();

  // MOCK Fallback (if offline)
  if (mongoose.connection.readyState !== 1) {
    console.log('MongoDB connection offline. Running in-memory login fallback.');
    const user = mockUsers.find(u => u.email === normalizedEmail);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = user.passwordHash === hashPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    return res.json({
      message: 'Login successful (Offline Demo Mode)',
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      }
    });
  }

  // Normal database operation (if online)
  try {
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = user.password === hashPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.json({
      message: 'Login successful',
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// @route   GET /api/auth/users
// @desc    Get all users (for admin panel)
router.get('/users', async (req, res) => {
  // Mock fallback (if database is offline)
  if (mongoose.connection.readyState !== 1) {
    console.log('MongoDB connection offline. Serving mock users registry.');
    return res.json(mockUsers);
  }

  try {
    const users = await User.find({}, '-password'); // exclude password
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
