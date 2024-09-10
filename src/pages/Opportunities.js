// src/components/Opportunities.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Opportunities.css'; // Import your CSS styles

const Opportunities = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [filteredOpportunities, setFilteredOpportunities] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const response = await axios.get('http://localhost:4000/addjobs');
        setOpportunities(response.data);
        setFilteredOpportunities(response.data);
      } catch (error) {
        console.error('Failed to fetch opportunities', error);
      }
    };

    fetchOpportunities();
  }, []);

  useEffect(() => {
    if (filter === 'all') {
      setFilteredOpportunities(opportunities);
    } else {
      setFilteredOpportunities(opportunities.filter(opportunity => opportunity.type === filter));
    }
  }, [filter, opportunities]);

  return (
    <div className="opportunities-container">
         <h2 className="text-center mb-4">Land On Your Dream Job</h2>
      <div className="filter-buttons">
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('internship')}>Internships</button>
        <button onClick={() => setFilter('job')}>Jobs</button>
      </div>
      <div className="opportunities-grid">
        {filteredOpportunities.map((opportunity, index) => (
          <div key={index} className="opportunity-card">
            <h3>{opportunity.company}</h3>
            <p><strong>Role:</strong> {opportunity.role}</p>
            <p><strong>Type:</strong> {opportunity.type}</p>
            <p><strong>Location:</strong> {opportunity.location}</p>
            <p><strong>Full Time:</strong> {opportunity.fullTime ? 'Yes' : 'No'}</p>
            <a href={opportunity.applicationLink} target="_blank" rel="noopener noreferrer" className="apply-button">
              Apply Now
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Opportunities;
