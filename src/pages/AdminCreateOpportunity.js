// src/components/CreateOpportunity.js
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/AdminCreateOpportunity.css';

const AdminCreateOpportunity = () => {
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    fullTime: false,
    type: 'internship',
    location: '',
    applicationLink: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/addjobs', formData);
      alert('Opportunity posted successfully');
      setFormData({
        company: '',
        role: '',
        fullTime: false,
        type: 'internship',
        location: '',
        applicationLink: ''
      });
    } catch (error) {
      alert('Failed to post opportunity');
    }
  };

  return (
    <form className="addjob-form" onSubmit={handleSubmit}>
      <h2 className="addjob-form-title">Create Opportunity</h2>
      <input
        type="text"
        name="company"
        placeholder="Company"
        value={formData.company}
        onChange={handleChange}
        className="addjob-form-input"
        required
      />
      <input
        type="text"
        name="role"
        placeholder="Role"
        value={formData.role}
        onChange={handleChange}
        className="addjob-form-input"
        required
      />
      <label className="addjob-form-checkbox-label">
        Full Time:
        <input
          type="checkbox"
          name="fullTime"
          checked={formData.fullTime}
          onChange={handleChange}
          className="addjob-form-checkbox"
        />
      </label>
      <select
        name="type"
        value={formData.type}
        onChange={handleChange}
        className="addjob-form-select"
        required
      >
        <option value="internship">Internship</option>
        <option value="job">Job</option>
      </select>
      <input
        type="text"
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
        className="addjob-form-input"
        required
      />
      <input
        type="url"
        name="applicationLink"
        placeholder="Application Link"
        value={formData.applicationLink}
        onChange={handleChange}
        className="addjob-form-input"
        required
      />
      <button type="submit" className="addjob-form-button">Post Opportunity</button>
    </form>
  );
};

export default AdminCreateOpportunity;
