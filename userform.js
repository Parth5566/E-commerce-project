const express = require('express');
const {validationResult } = require('express-validator');
const router = express.Router();
const mongoose = require('mongoose');
const UserForm = require('../models/UserForm');

// Route to save form data
router.post('/submit',
  // You can add validation checks here if needed
  async (req, res) => {
    // Destructure all required fields from the request body
    const {
      User,
      fullName,
      email,
      contactNumber,
      institution,
      course,
      yearOfStudy,
      projectTitle,
      projectDescription,
      targetAudience,
      usp,
      stageOfDevelopment,
      expectedOutcomes,
      technologiesUsed,
      budgetRequirements,
      timeline,
      marketingStrategy,
      socialMediaLinks,
      teamMembers,
      skillsNeeded,
      supportNeeded
    } = req.body;

    // Perform input validation (optional)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Create a new UserForm document
      const userForm = new UserForm({
        User, // Updated to match the schema
        fullName,
        email,
        contactNumber,
        institution,
        course,
        yearOfStudy,
        projectTitle,
        projectDescription,
        targetAudience,
        usp,
        stageOfDevelopment,
        expectedOutcomes,
        technologiesUsed,
        budgetRequirements,
        timeline,
        marketingStrategy,
        socialMediaLinks,
        teamMembers,
        skillsNeeded,
        supportNeeded
      });

      // Save the form data to the database
      const savedForm = await userForm.save();

      // Respond with the saved form data
      res.status(201).json(savedForm);
    } catch (error) {
      console.error('Error saving form data:', error.message);
      res.status(500).send('Internal Server Error');
    }
  }
);

module.exports = router;
