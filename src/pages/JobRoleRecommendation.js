import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faSync } from '@fortawesome/free-solid-svg-icons';
import '../styles/JobRoleRecommendation.css';

const availableSkills = [
  'HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Express', 'MongoDB', 'Python',
  'SQL', 'Machine Learning', 'Data Analysis', 'Selenium', 'Postman', 'Docker',
  'Kubernetes', 'AWS', 'CI/CD', 'Terraform', 'Jira', 'Figma', 'Sketch'
];

const JobRoleRecommendation = () => {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [recommendedRoles, setRecommendedRoles] = useState([]);
  const [resumeFile, setResumeFile] = useState(null);

  const handleSkillAdd = (skill) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills((prevSkills) => [...prevSkills, skill]);
    }
  };

  const handleSkillRemove = (skill) => {
    setSelectedSkills((prevSkills) => prevSkills.filter((s) => s !== skill));
  };

  const handleResumeUpload = (e) => {
    setResumeFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (resumeFile) {
      const formData = new FormData();
      formData.append('resume', resumeFile);
      try {
        const response = await axios.post('http://localhost:5001/recommend_from_resume', formData);
        const { recommended_roles } = response.data;
        setRecommendedRoles(recommended_roles);
      } catch (error) {
        console.error('Error recommending job role from resume:', error);
      }
    } else if (selectedSkills.length > 0) {
      try {
        const response = await axios.post('http://localhost:5001/recommend', { skills: selectedSkills.join(', ') });
        setRecommendedRoles([response.data.recommended_role]);
      } catch (error) {
        console.error('Error recommending job role:', error);
      }
    }
  };

  const handleClearSkills = () => {
    setSelectedSkills([]);
    setRecommendedRoles([]);
    setResumeFile(null);
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="job-container">
      <h1>Find the Job That Best Fits You</h1>
      <div className="job-flex-container">
        <div className="job-resume-upload">
          <h2>Upload Your Resume</h2>
          <input type="file" accept=".pdf,.docx" onChange={handleResumeUpload} />
        </div>
        
        <div className="divider" />

        <div className="job-available-skills">
          <h2>My Expertise</h2>
          <div className="job-skill-button-container">
            {availableSkills.map((skill) => (
              <div key={skill} className="job-skill-button">
                <button
                  type="button"
                  className="job-skill-button add"
                  onClick={() => handleSkillAdd(skill)}
                >
                  + {skill}
                </button>
              </div>
            ))}
          </div>

          <div className="job-selected-skills">
            <div className="job-skill-tags">
              {selectedSkills.map((skill) => (
                <span key={skill} className="job-skill-tag">
                  {skill}
                  <button 
                    type="button" 
                    onClick={() => handleSkillRemove(skill)} 
                    className="job-remove-skill"
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </span>
              ))}
            </div>
            <textarea
              value={selectedSkills.join(', ')}
              readOnly
              placeholder="Selected skills will appear here"
            />
          </div>

          <button type="button" onClick={handleClearSkills} className="job-clear-button">Clear All</button>
        </div>
      </div>

      <div className="button-container">
        <button type="submit" onClick={handleSubmit} className="job-recommend-button">Get Recommendation</button>
        <button type="button" onClick={handleRefresh} className="job-refresh-button">
          <FontAwesomeIcon icon={faSync} /> Refresh
        </button>
      </div>

      {recommendedRoles.length > 0 && (
        <div className="job-recommendation-section">
          <h2>Recommended Job Role(s):</h2>
          <ul>
            {recommendedRoles.map((role, index) => (
              <li key={index}>{role}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default JobRoleRecommendation;
