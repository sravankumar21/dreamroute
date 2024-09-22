const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
// const admin = require('../firebase-admin'); // Firebase Admin SDK (if needed for verification)

const router = express.Router();

const JWT_SECRET = 'Ganesh@123'; // Replace with your secret key

// Firebase Google Sign-In route
router.post('/firebase-signin', async (req, res) => {
  const { email, displayName, photoURL, uid } = req.body;

  if (!email || !uid) {
    return res.status(400).json({ message: 'Invalid Google Sign-In data' });
  }

  try {
    // Check if the user already exists in MongoDB
    let user = await User.findOne({ email });
    
    if (!user) {
      // Create a new user if they don't exist
      user = new User({ email, displayName, photoURL, firebaseUID: uid });
      await user.save();
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error('Firebase Sign-In Error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Signup route
router.post('/signup', async (req, res) => {
  const { email, password, first_name, last_name } = req.body;

  if (!email || !password || !first_name || !last_name) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword, first_name, last_name });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Signup Error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Signin route
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('Signin Error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
