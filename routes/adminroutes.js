// adminRoutes.js

const express = require('express');
const Job = require('../models/job'); // Import the Job model
const Skill = require('../models/skill'); // Import the Skill model
const router = express.Router();
const mongoose=require("mongoose")
// Add a new job posting
router.post('/jobs', async (req, res) => {
    try {
      const { company, title, description, link, requiredSkills } = req.body;
  
      // Create an array to store the Skill IDs
      const skillIds = [];
  
      // Check if the requiredSkills array contains existing Skill IDs or new skill names
      for (const skill of requiredSkills) {
        let skillId;
        if (mongoose.Types.ObjectId.isValid(skill)) {
          // If the skill is a valid ObjectId, it already exists in the Skill collection
          skillId = skill;
        } else {
          // If the skill is not a valid ObjectId, it's a new skill name
          // Check if the skill name already exists in the Skill collection
          const existingSkill = await Skill.findOne({ name: skill });
          if (existingSkill) {
            // If the skill already exists, use its existing ObjectId
            skillId = existingSkill._id;
          } else {
            // If the skill doesn't exist, create a new skill
            const newSkill = await Skill.create({ name: skill });
            skillId = newSkill._id;
          }
        }
        skillIds.push(skillId);
      }
  
      // Create the job posting with the skill IDs
      const newJob = await Job.create({
        company,
        title,
        description,
        link,
        requiredSkills: skillIds,
      });
  
      res.json({ message: 'Job posting added successfully!', job: newJob });
    } catch (error) {
      res.status(500).json({ message: 'Error occurred while adding job posting', error: error.message });
    }
  });

// Remove a job posting by its ID
router.delete('/jobs/:jobId', async (req, res) => {
  try {
    const jobId = req.params.jobId;

    // Remove the job posting from the database
    await Job.findByIdAndRemove(jobId);

    res.json({ message: 'Job posting removed successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error occurred while removing job posting', error: error.message });
  }
});

module.exports = router;
