const mongoose = require('mongoose');
const connectDB = require('../config/db');
const bcrypt = require('bcrypt');
connectDB();


const adminSchema = new mongoose.Schema({
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
    isAdmin: {
      type: Boolean,
      default: true, // Set isAdmin to true for admin users
    },
    // Add any additional fields you need for admins
  });

adminSchema.pre('save', async function (next) {
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

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;