// src/components/QuickRevision.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/quickrevision.css';

const QuickRevision = () => {
  const [selectedDomain, setSelectedDomain] = useState('');
  const [questions, setQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Load JSON data based on selected domain
  const loadDomainData = async (domain) => {
    const response = await fetch(`/data/${domain}.json`);
    const data = await response.json();
    setQuestions(data);
  };

  // Handle domain selection
  const handleDomainClick = (domain) => {
    setSelectedDomain(domain);
    setSearchTerm('');
    loadDomainData(domain);
  };

  // Handle search input
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter questions based on search term
  const filteredQuestions = questions.filter((q) =>
    q.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Quick Revision</h2>
      <div className="d-flex justify-content-center mb-3">
        <button
          className={`btn btn-outline-primary mx-2 ${selectedDomain === 'oops' ? 'active' : ''}`}
          onClick={() => handleDomainClick('oops')}
        >
          OOPS
        </button>
        <button
          className={`btn btn-outline-primary mx-2 ${selectedDomain === 'dbms' ? 'active' : ''}`}
          onClick={() => handleDomainClick('dbms')}
        >
          DBMS
        </button>
        <button
          className={`btn btn-outline-primary mx-2 ${selectedDomain === 'os' ? 'active' : ''}`}
          onClick={() => handleDomainClick('os')}
        >
          OS
        </button>
        <button
          className={`btn btn-outline-primary mx-2 ${selectedDomain === 'networks' ? 'active' : ''}`}
          onClick={() => handleDomainClick('networks')}
        >
          Computer Networks
        </button>
        <button
          className={`btn btn-outline-primary mx-2 ${selectedDomain === 'java' ? 'active' : ''}`}
          onClick={() => handleDomainClick('java')}
        >
          Java
        </button>
        <button
          className={`btn btn-outline-primary mx-2 ${selectedDomain === 'webdev' ? 'active' : ''}`}
          onClick={() => handleDomainClick('webdev')}
        >
          Web Development
        </button>
        <button
          className={`btn btn-outline-primary mx-2 ${selectedDomain === 'datascience' ? 'active' : ''}`}
          onClick={() => handleDomainClick('datascience')}
        >
          Data Science
        </button>
      </div>

      {selectedDomain && (
        <div className="revision-section">
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Search for a topic..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <div className="list-group">
            {filteredQuestions.map((q, index) => (
              <div key={index} className="list-group-item">
                <h5>{q.question}</h5>
                <p>{q.answer}</p>
              </div>
            ))}
            {filteredQuestions.length === 0 && (
              <p className="text-muted">No topics found. Try a different search term.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickRevision;
