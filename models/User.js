const mongoose = require('mongoose');
const connectDB = require('../config/db');
const bcrypt = require('bcrypt');
connectDB();

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  skills: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Skill',
    },
  ],
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
      next();
    } catch (err) {
      return next(err);
    }
  } else {
    return next();
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;