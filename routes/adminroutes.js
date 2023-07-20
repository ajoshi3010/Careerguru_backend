// adminRoutes.js

const express = require('express');
const Job = require('../skills_jobs/job'); // Import the Job model
const Skill = require('../skills_jobs/skill'); // Import the Skill model
const router = express.Router();

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
        skillId = skill; // Existing skill ID
      } else {
        // Create a new Skill if the skill name doesn't already exist
        const newSkill = await Skill.create({ name: skill });
        skillId = newSkill._id;
      }
      skillIds.push(skillId);
    }

    // Create a new job posting with the requiredSkills
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
