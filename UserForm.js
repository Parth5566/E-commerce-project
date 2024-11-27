const mongoose = require('mongoose');

const UserFormSchema = new mongoose.Schema({
  User: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  institution: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  yearOfStudy: {
    type: String,
    required: true,
  },
  projectTitle: {
    type: String,
    required: true,
  },
  projectDescription: {
    type: String,
    required: true,
  },
  targetAudience: {
    type: String,
    required: true,
  },
  usp: { // Unique Selling Proposition
    type: String,
    required: true,
  },
  stageOfDevelopment: {
    type: String,
    required: true,
  },
  expectedOutcomes: {
    type: String,
    required: true,
  },
  technologiesUsed: {
    type: String,
    required: true,
  },
  budgetRequirements: {
    type: String,
    required: true,
  },
  timeline: {
    type: String,
    required: true,
  },
  marketingStrategy: {
    type: String,
    required: true,
  },
  socialMediaLinks: {
    type: String,
  },
  teamMembers: {
    type: String,
  },
  skillsNeeded: {
    type: String,
  },
  supportNeeded: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('UserForm', UserFormSchema);

