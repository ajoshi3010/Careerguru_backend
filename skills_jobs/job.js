const mongoose = require('mongoose');
const connectDB = require('../config/db');
connectDB();
const jobSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  requiredSkills: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Skill',
    },
  ],
  // Add other fields as needed for jobs
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;