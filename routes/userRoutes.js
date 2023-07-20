// userRoutes.js

const express = require('express');
const Job = require('../skills_jobs/job'); // Import the Job model
const Skill = require('../skills_jobs/skill'); // Import the Skill model
const router = express.Router();

// Get job postings based on user skills
router.get('/jobs/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Assuming you have a way to get the user's skills
    const userSkills = ['Skill 1', 'Skill 2', 'Skill 3'];

    // Find the Skill IDs for the user's skills
    const skillIds = await Skill.find({ name: { $in: userSkills } }, '_id');

    // Find job postings that require any of the user's skills
    const jobs = await Job.find({ requiredSkills: { $in: skillIds } });

    res.json({ jobs });
  } catch (error) {
    res.status(500).json({ message: 'Error occurred while fetching job postings', error: error.message });
  }
});

module.exports = router;
