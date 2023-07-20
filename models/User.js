const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  // Add any additional fields you require
});

const User = mongoose.model('User', userSchema);

module.exports = User;
