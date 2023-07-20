const express = require('express');
const passport = require('../config/Passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../config/User');
const { secretKey } = require('../keys');
const router=express.Router();
router.post('/signup', async (req, res) => {
    try {
        console.log("Hi");
      const { username, password } = req.body;
      // Check if the username is already taken
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(409).json({ message: 'Username already taken' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user
      const newUser = new User({
        username,
        password: hashedPassword
      });
  
      // Save the user to the database
      await newUser.save();
  
      res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Internal server error' });
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