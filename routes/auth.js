const express = require('express');
const passport = require('../config/Passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { secretKey } = require('../keys');
const router=express.Router();
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password, skills } = req.body;

    // Create a new user with the provided username, email, and password
    const newUser = new User({
      username,
      email,
      password,
      skills: skills || [], // Make the skills field optional, default to an empty array if not provided
    });

    // Save the new user to the database
    await newUser.save();

    res.json({ message: 'User signup successful', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error occurred during user signup', error: error.message });
  }
});
  
  // Login route
  router.post('/login', (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
      if (err || !user) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
  
      // Generate a JSON Web Token (JWT)
      const token = jwt.sign({ userId: user.id }, secretKey);
  
      return res.json({ token });
    })(req, res, next);
  });
  
  module.exports = router;