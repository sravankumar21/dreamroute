import React, { useState } from 'react';
import '../styles/AdminSkillEvaluator.css'; // Import the CSS file

const AdminSkillEvaluator = () => {
  const [form, setForm] = useState({
    domain: '',
    domainType: '',
    question: '',
    options: ['', '', '', ''],
    correctAnswer: '',
    skillLevel: 'beginner'  // Added field
  });

  const domains = [
    { name: 'Web Development', type: 'tech' },
    { name: 'Digital Marketing', type: 'non-tech' },
    { name: 'Operating Systems', type: 'tech' },
    { name: 'Database Management System', type: 'tech' },
    { name: 'Data Structures and Algorithms', type: 'tech' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleOptionChange = (index, value) => {
    const options = [...form.options];
    options[index] = value;
    setForm({ ...form, options });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if all fields are filled
    if (!form.domain || !form.domainType || !form.question || !form.correctAnswer || form.options.includes('')) {
      alert('Please fill in all fields before submitting.');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/api/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (response.ok) {
        alert('Question added successfully!');
        setForm({
          domain: '',
          domainType: '',
          question: '',
          options: ['', '', '', ''],
          correctAnswer: '',
          skillLevel: 'beginner'  // Reset skill level
        });
      } else {
        alert('Error adding question. Please try again.');
      }
    } catch (error) {
      console.error('Error adding question:', error);
      alert('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <div className="admin-skill-evaluator">
      <h1>Admin Skill Evaluator</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Domain:</label>
          <select name="domain" value={form.domain} onChange={handleChange}>
            <option value="">Select a domain</option>
            {domains.map((domain, index) => (
              <option key={index} value={domain.name}>{domain.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Domain Type:</label>
          <select name="domainType" value={form.domainType} onChange={handleChange}>
            <option value="">Select domain type</option>
            <option value="tech">Tech</option>
            <option value="non-tech">Non-Tech</option>
          </select>
        </div>
        <div className="form-group">
          <label>Question:</label>
          <input type="text" name="question" value={form.question} onChange={handleChange} />
        </div>
        {form.options.map((option, index) => (
          <div className="form-group" key={index}>
            <label>Option {index + 1}:</label>
            <input
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
            />
          </div>
        ))}
        <div className="form-group">
          <label>Correct Answer:</label>
          <select name="correctAnswer" value={form.correctAnswer} onChange={handleChange}>
            <option value="">Select the correct answer</option>
            {form.options.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Skill Level:</label>
          <select name="skillLevel" value={form.skillLevel} onChange={handleChange}>
            <option value="beginner">Beginner</option>
            <option value="pro">Pro</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
        <button type="submit" className="submit-button">Add Question</button>
      </form>
    </div>
  );
};

export default AdminSkillEvaluator;
