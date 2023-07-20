const mongoose = require('mongoose');
const connectDB = require('./db');
connectDB();
const userSchema = new mongoose.Schema({
  username: String,
  password: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;
