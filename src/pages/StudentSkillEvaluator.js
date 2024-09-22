import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import '../styles/StudentSkillEvaluator.css';

import webDevImage from '../images/newfeatureimage.avif';
import dataScienceImage from '../images/newfeatureimage.avif';
import mlImage from '../images/newfeatureimage.avif';
import cybersecurityImage from '../images/newfeatureimage.avif';
import uiuxImage from '../images/newfeatureimage.avif';
import digitalMarketingImage from '../images/newfeatureimage.avif';
import contentWritingImage from '../images/newfeatureimage.avif';
import projectManagementImage from '../images/newfeatureimage.avif';

const domains = [
  { name: 'Web Development', type: 'tech', image: webDevImage },
  { name: 'Data Science', type: 'tech', image: dataScienceImage },
  { name: 'Machine Learning', type: 'tech', image: mlImage },
  { name: 'Cybersecurity', type: 'tech', image: cybersecurityImage },
  { name: 'Operating Systems', type: 'tech', image: webDevImage },
  { name: 'Database Management Systems', type: 'tech', image: dataScienceImage },
  { name: 'Computer Networks', type: 'tech', image: mlImage },
  { name: 'Oops', type: 'tech', image: cybersecurityImage },
  { name: 'UI/UX Design', type: 'non-tech', image: uiuxImage },
  { name: 'Digital Marketing', type: 'non-tech', image: digitalMarketingImage },
  { name: 'Content Writing', type: 'non-tech', image: contentWritingImage },
  { name: 'Project Management', type: 'non-tech', image: projectManagementImage },
  { name: 'Aptitude', type: 'aptitude', image: webDevImage }, // Add Aptitude
];

const StudentSkillEvaluator = () => {
  const [filter, setFilter] = useState('tech'); 
  const navigate = useNavigate();

  const handleDomainClick = (domain) => {
    navigate(`/exam/${domain}`);
  };

  const handleFilterChange = (type) => {
    setFilter(type);
  };

  return (
    <div className="evaluator-container">
      <h1 className="evaluator-title">Test Your Potential</h1>
      
      <div className="filter-buttons">
        <button 
          className={`filter-button ${filter === 'tech' ? 'active' : ''}`} 
          onClick={() => handleFilterChange('tech')}
        >
          Tech Domains
        </button>
        <button 
          className={`filter-button ${filter === 'non-tech' ? 'active' : ''}`} 
          onClick={() => handleFilterChange('non-tech')}
        >
          Non-Tech Domains
        </button>
        <button 
          className={`filter-button ${filter === 'aptitude' ? 'active' : ''}`} 
          onClick={() => handleFilterChange('aptitude')}
        >
          Aptitude
        </button>
      </div>
      
      <div className="card-container">
        {domains.filter(domain => domain.type === filter).map((domain, index) => (
          <div 
            key={index} 
            className="domain-card" 
            onClick={() => handleDomainClick(domain.name)}
          >
            <img src={domain.image} alt={domain.name} className="card-image" />
            <div className="card-title">{domain.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentSkillEvaluator;
