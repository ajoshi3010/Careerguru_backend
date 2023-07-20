// userRoutes.js

const express = require('express');
const Job = require('../models/job'); // Import the Job model
const Skill = require('../models/skill'); // Import the Skill model
const User=require('../models/User')
const router = express.Router();

// Route to get job recommendations for a user based on their skills
router.get('/job-recommendations/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find the user by ID
    const user = await User.findById(userId).populate('skills'); // Populate the skills field in user document

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get the user's skill IDs
    const userSkillIds = user.skills.map(skill => skill._id);

    // Find job postings that require at least one of the user's skills
    const jobRecommendations = await Job.find({ requiredSkills: { $in: userSkillIds } });

    res.json({ jobRecommendations });
  } catch (error) {
    res.status(500).json({ message: 'Error occurred while fetching job recommendations', error: error.message });
  }
});

// Route to update the skills of a user
router.put('/users/:userId/skills', async (req, res) => {
  try {
    const userId = req.params.userId;
    const { skills } = req.body;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user's skills
    user.skills = skills;
    await user.save();

    res.json({ message: 'User skills updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error occurred while updating user skills', error: error.message });
  }
});

module.exports = router;