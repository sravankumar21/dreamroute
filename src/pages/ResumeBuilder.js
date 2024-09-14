// src/components/ResumeBuilder.js
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/ResumeBuilder.css';  // Import custom CSS for styling

function ResumeBuilder() {
    const [resume, setResume] = useState(null);
    const [jobDescription, setJobDescription] = useState('');
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleResumeChange = (e) => {
        setResume(e.target.files[0]);
    };

    const handleJobDescriptionChange = (e) => {
        setJobDescription(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setResponse(null);

        const formData = new FormData();
        formData.append('resume', resume);
        formData.append('job_description', jobDescription);

        try {
            const res = await axios.post('http://localhost:5000/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setResponse(res.data);
        } catch (err) {
            setError('Error uploading files. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="resume-builder">
            <h1>Resume Enhancer</h1>
            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <label htmlFor="resume">Upload Your Resume (PDF)</label>
                    <input type="file" id="resume" onChange={handleResumeChange} accept=".pdf" required />
                </div>
                <div className="form-group">
                    <label htmlFor="job-description">Job Description</label>
                    <textarea
                        id="job-description"
                        placeholder="Paste job description here"
                        value={jobDescription}
                        onChange={handleJobDescriptionChange}
                        rows="10"
                        required
                    />
                </div>
                <button type="submit" className="submit-button" disabled={loading}>
                    {loading ? 'Processing...' : 'Enhance Resume'}
                </button>
            </form>

            {error && <div className="error">{error}</div>}
            
            {response && (
                <div className="result">
                    <p><strong>ATS Score:</strong> {response.ats_score}</p>
                    <a href={`http://localhost:5000${response.download_url}`} download className="download-link">
                        Download Enhanced Resume
                    </a>
                </div>
            )}
        </div>
    );
}

export default ResumeBuilder;
