import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import '/src/css/userform.css'; 
import { useNavigate } from 'react-router-dom'; // Corrected import for navigate

const UserForm = () => {
  const navigate = useNavigate(); // Use hook for navigation
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Basic Information
    fullName: '',
    email: '',
    contactNumber: '',
    institution: '',
    course: '',
    yearOfStudy: '',
    
    // Project Details
    projectTitle: '',
    projectDescription: '',
    targetAudience: '',
    usp: '',
    stageOfDevelopment: '',
    expectedOutcomes: '',
    
    // Technical Details
    technologiesUsed: '',
    budgetRequirements: '',
    timeline: '',
    
    // Marketing and Promotion
    marketingStrategy: '',
    socialMediaLinks: '',
    
    // Collaboration and Support
    teamMembers: '',
    skillsNeeded: '',
    supportNeeded: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateSection = () => {
    switch (step) {
      case 1:
        return formData.fullName && formData.email && formData.contactNumber && formData.institution && formData.course && formData.yearOfStudy;
      case 2:
        return formData.projectTitle && formData.projectDescription && formData.targetAudience && formData.usp && formData.stageOfDevelopment && formData.expectedOutcomes;
      case 3:
        return formData.technologiesUsed && formData.budgetRequirements && formData.timeline;
      case 4:
        return formData.marketingStrategy && formData.socialMediaLinks;
      case 5:
        return formData.teamMembers && formData.skillsNeeded && formData.supportNeeded;
      default:
        return false;
    }
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateSection()) {
      toast.error('Please fill in all fields in the last section.');
      return;
    }
  
    try {
      const   User = localStorage.getItem("userId"); // Get userId from local storage
      if (!User) {
        throw new Error("User ID not found in local storage");
      }
      console.log("User ID:", User);
  
      // Prepare the form data to send to the server
      const formDataToSend = {
        User, // Use lowercase 'user' to match the schema
        ...formData, // Spread the existing form data
      };
  
      const response = await fetch('http://127.0.0.1:3000/api/UserForm/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataToSend),
      });
  
      // Parse the server response
      let json;
      try {
        json = await response.json();
      } catch (parseError) {
        console.error('Failed to parse JSON:', parseError);
        toast.error('Server returned an invalid response');
        return;
      }
  
      // Handle different response statuses
      if (response.status === 400) {
        toast.error('Please enter valid details');
      } else if (response.status === 201) {
        toast.success('Form submitted successfully!');
        setTimeout(() => {
          navigate('/Home');
        }, 2000);
      } else {
        toast.error(json.message || 'An error occurred, please try again');
      }
    } catch (error) {
      console.error('Network error:', error);
      toast.error('Unable to submit your form!');
    }
  };
  
  return (
    <div className="container my-5">
      <Toaster />
      <form onSubmit={handleSubmit} className="p-4 border rounded shadow">
        {step === 1 && (
          <div className="mb-4">
            <h3>Basic Information</h3>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                className="form-control"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Contact Number</label>
              <input
                type="tel"
                name="contactNumber"
                className="form-control"
                value={formData.contactNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Educational Institution</label>
              <input
                type="text"
                name="institution"
                className="form-control"
                value={formData.institution}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Course/Field of Study</label>
              <input
                type="text"
                name="course"
                className="form-control"
                value={formData.course}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Year of Study</label>
              <input
                type="text"
                name="yearOfStudy"
                className="form-control"
                value={formData.yearOfStudy}
                onChange={handleChange}
                required
              />
            </div>
            <button type="button" className="btn btn-primary mb-3" onClick={handleNext}>
              Next
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="mb-4">
            <h3>Project Details</h3>
            <div className="form-group">
              <label>Project Title</label>
              <input
                type="text"
                name="projectTitle"
                className="form-control"
                value={formData.projectTitle}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Project Description</label>
              <textarea
                name="projectDescription"
                className="form-control"
                value={formData.projectDescription}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Target Audience</label>
              <input
                type="text"
                name="targetAudience"
                className="form-control"
                value={formData.targetAudience}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Unique Selling Proposition (USP)</label>
              <input
                type="text"
                name="usp"
                className="form-control"
                value={formData.usp}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Stage of Development</label>
              <input
                type="text"
                name="stageOfDevelopment"
                className="form-control"
                value={formData.stageOfDevelopment}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Expected Outcomes</label>
              <textarea
                name="expectedOutcomes"
                className="form-control"
                value={formData.expectedOutcomes}
                onChange={handleChange}
                required
              />
            </div>
            <button type="button" className="btn btn-secondary mb-3" onClick={handlePrev}>
              Back
            </button>
            <button type="button" className="btn btn-primary mb-3" onClick={handleNext}>
              Next
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="mb-4">
            <h3>Technical Details</h3>
            <div className="form-group">
              <label>Technologies Used</label>
              <input
                type="text"
                name="technologiesUsed"
                className="form-control"
                value={formData.technologiesUsed}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Budget Requirements</label>
              <input
                type="text"
                name="budgetRequirements"
                className="form-control"
                value={formData.budgetRequirements}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Timeline</label>
              <input
                type="text"
                name="timeline"
                className="form-control"
                value={formData.timeline}
                onChange={handleChange}
                required
              />
            </div>
            <button type="button" className="btn btn-secondary mb-3" onClick={handlePrev}>
              Back
            </button>
            <button type="button" className="btn btn-primary mb-3" onClick={handleNext}>
              Next
            </button>
          </div>
        )}

        {step === 4 && (
          <div className="mb-4">
            <h3>Marketing and Promotion</h3>
            <div className="form-group">
              <label>Marketing Strategy</label>
              <input
                type="text"
                name="marketingStrategy"
                className="form-control"
                value={formData.marketingStrategy}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Social Media Links</label>
              <input
                type="text"
                name="socialMediaLinks"
                className="form-control"
                value={formData.socialMediaLinks}
                onChange={handleChange}
                required
              />
            </div>
            <button type="button" className="btn btn-secondary mb-3" onClick={handlePrev}>
              Back
            </button>
            <button type="button" className="btn btn-primary mb-3" onClick={handleNext}>
              Next
            </button>
          </div>
        )}

        {step === 5 && (
          <div className="mb-4">
            <h3>Collaboration and Support</h3>
            <div className="form-group">
              <label>Team Members</label>
              <input
                type="text"
                name="teamMembers"
                className="form-control"
                value={formData.teamMembers}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Skills Needed</label>
              <input
                type="text"
                name="skillsNeeded"
                className="form-control"
                value={formData.skillsNeeded}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Support Needed</label>
              <input
                type="text"
                name="supportNeeded"
                className="form-control"
                value={formData.supportNeeded}
                onChange={handleChange}
                required
              />
            </div>
            <button type="button" className="btn btn-secondary mb-3" onClick={handlePrev}>
              Back
            </button>
            <button type="submit" className="btn btn-success mb-3">
              Submit
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default UserForm;
