// AdminDashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminDashboard.css'; // Importing CSS for styling

// Importing images
import adminImage from '../images/adminimage.jpg';
import featureImage1 from '../images/newfeatureimage.avif';
import featureImage2 from '../images/newfeatureimage.avif';
import featureImage3 from '../images/newfeatureimage.avif';
import featureImage4 from '../images/newfeatureimage.avif';
import featureImage5 from '../images/newfeatureimage.avif';
import featureImage6 from '../images/newfeatureimage.avif';
import featureImage7 from '../images/newfeatureimage.avif';

const featuresData = [
{ title: 'Manage Users', image: featureImage6, route: '/user-management' },
  { title: 'Career Coach', image: featureImage1, route: '/career-coach' },
  { title: 'Resume Builder', image: featureImage2, route: '/resume-builder' },
  { title: 'Interview Prep', image: featureImage3, route: '/interview-prep' },
  { title: 'Career Path Finder', image: featureImage4, route: '/career-path-finder' },
  { title: 'Skill Evaluator', image: featureImage5, route: '/adminskillsadd' },
  { title: 'Job Matcher', image: featureImage6, route: '/job-matcher' },
  { title: 'Create Opportunity', image: featureImage7, route: '/adminjobadd' },
];

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleFeatureClick = (route) => {
    navigate(route);
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-image-container">
        <img src={adminImage} alt="Admin" className="admin-image" />
      </div>
      <h1 className="admin-heading">Welcome Admin</h1>
      <div className="feature-cards-container">
        {featuresData.map((feature, index) => (
          <div 
            key={index} 
            className="feature-card" 
            onClick={() => handleFeatureClick(feature.route)}
          >
            <img src={feature.image} alt={feature.title} className="feature-card-image" />
            <h2 className="feature-card-title">{feature.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
