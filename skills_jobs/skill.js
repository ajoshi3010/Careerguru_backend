// skill.js

const mongoose = require('mongoose');
const connectDB = require('../config/db');
connectDB();
const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  // Add other fields as needed for skills
});

const Skill = mongoose.model('Skill', skillSchema);

module.exports = Skill;


// job.js


