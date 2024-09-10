import React, { useState } from 'react';
import axios from 'axios';
import '../styles/JobRoleRecommendation.css';  // Import the CSS file

const availableSkills = [
  'HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Express', 'MongoDB', 'Python',
  'SQL', 'Machine Learning', 'Data Analysis', 'Selenium', 'Postman', 'Docker',
  'Kubernetes', 'AWS', 'CI/CD', 'Terraform', 'Jira', 'Figma', 'Sketch'
];

const JobRoleRecommendation = () => {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [recommendedRole, setRecommendedRole] = useState('');

  const handleSkillAdd = (skill) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills((prevSkills) => [...prevSkills, skill]);
    }
  };

  const handleSkillRemove = (skill) => {
    setSelectedSkills((prevSkills) => prevSkills.filter((s) => s !== skill));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const skills = selectedSkills.join(', ');

    try {
      const response = await axios.post('http://localhost:5001/recommend', { skills });
      setRecommendedRole(response.data.recommended_role);
    } catch (error) {
      console.error('Error recommending job role:', error);
    }
  };

  return (
    <div className="job-container">
      <h1>Find the Job That Best Fits For You</h1>
      <form onSubmit={handleSubmit}>
        <div className="selected-skills">
          <div className="skill-tags">
            {selectedSkills.map((skill) => (
              <span key={skill} className="skill-tag">
                {skill} <button type="button" onClick={() => handleSkillRemove(skill)} className="remove-skill"> - </button>
              </span>
            ))}
          </div>
          <textarea
            value={selectedSkills.join(', ')}
            readOnly
            placeholder="Selected skills will appear here"
          />
        </div>
        <div className="available-skills">
          <h2>My Expertise</h2>
          <div className="skill-button-container">
            {availableSkills.map((skill) => (
              <div key={skill} className="skill-button">
                <button
                  type="button"
                  className="skill-button add"
                  onClick={() => handleSkillAdd(skill)}
                >
                  + {skill}
                </button>
              </div>
            ))}
          </div>
        </div>
        <button type="submit">Get Recommendation</button>
      </form>
      {recommendedRole && (
        <div className="recommendation-section">
          <h2>Recommended Job Role:</h2>
          <p>{recommendedRole}</p>
        </div>
      )}
    </div>
  );
};

export default JobRoleRecommendation;
