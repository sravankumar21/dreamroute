import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Features.css';
import problemImage from '../images/rightcareer.jpg';
import studentFeatureImage1 from '../images/student1.jpg';
import studentFeatureImage2 from '../images/student1.jpg';
import studentFeatureImage3 from '../images/student1.jpg';
import studentFeatureImage4 from '../images/student1.jpg';
import studentFeatureImage5 from '../images/student1.jpg';
import studentFeatureImage6 from '../images/student1.jpg';
import studentFeatureImage7 from '../images/student1.jpg';
import studentFeatureImage8 from '../images/student1.jpg';
import professionalFeatureImage2 from '../images/wide1_files/10886173.jpg';
import professionalFeatureImage3 from '../images/wide1_files/10886173.jpg';
import professionalFeatureImage4 from '../images/wide1_files/10886173.jpg';
import professionalFeatureImage5 from '../images/wide1_files/10886173.jpg';
import professionalFeatureImage6 from '../images/wide1_files/10886173.jpg';
import professionalFeatureImage7 from '../images/wide1_files/10886173.jpg';
import professionalFeatureImage8 from '../images/wide1_files/10886173.jpg';

const studentFeatures = [
  { title: 'Career Coach', description: 'Engage in real-time conversations tailored to your career goals.', image: studentFeatureImage1, route: '/career-coach' },
  { title: 'Career Path Finder', description: 'Discover potential career paths based on your skills.', image: studentFeatureImage4, route: '/path-finder' },
  { title: 'Skill Evaluator', description: 'Assess and improve your skills with interactive evaluations.', image: studentFeatureImage6, route: '/student-skill-evaluator' },
  { title: 'Resource Library', description: 'Enhance your existing skills with useful resources.', image: studentFeatureImage7, route: '/resource-library' },
  { title: 'Gamification', description: 'Learn by playing.', image: studentFeatureImage7, route: '/gamification' },
  { title: 'Resume Builder', description: 'Craft standout resumes with guided templates and tips.', image: studentFeatureImage2, route: '/resume-builder' },
  { title: 'Resume Enhancer', description: 'Polish your resume for better career prospects.', image: studentFeatureImage5, route: '/resume-enhancer' },
  { title: 'Interview Prep', description: 'Prepare for interviews with tailored questions.', image: studentFeatureImage3, route: '/interview-prep' },
  { title: 'Quick Revision', description: 'Learn and refresh quickly before interviews.', image: studentFeatureImage8, route: '/quick-revision' },
  { title: 'Schedule a Video Call', description: 'Set up and schedule interviews seamlessly.', image: studentFeatureImage5, route: '/schedule-video-call' },
  { title: 'Job Matcher', description: 'Match your profile with job opportunities.', image: studentFeatureImage5, route: '/job-matcher' },
  { title: 'Find Opportunities', description: 'Locate the right job openings suited to your profile.', image: studentFeatureImage4, route: '/find-opportunity' },
];

const professionalFeatures = [
 
  { title: 'Portfolio Builder', description: 'Create a professional portfolio to showcase your work.', image: professionalFeatureImage4, route: '/portfolio-builder' },
  { title: 'Interview Simulation', description: 'Simulate interviews to sharpen your skills.', image: professionalFeatureImage5, route: '/interview-simulation' },
  
  { title: 'Advanced Skill Assessments', description: 'Evaluate your expertise with in-depth tests.', image: professionalFeatureImage2, route: '/advanced-skill-assessments' },
  { title: 'Career Advancement Resources', description: 'Access materials to boost your career progression.', image: professionalFeatureImage8, route: '/career-resources' },
  { title: 'Skill Enhancement Workshops', description: 'Participate in workshops to enhance your skills.', image: professionalFeatureImage2, route: '/skill-workshops' },

  { title: 'Professional Networking', description: 'Expand your professional network effectively.', image: professionalFeatureImage3, route: '/networking' },
  { title: 'Feedback & Reviews (Community)', description: 'Receive constructive feedback on your applications.', image: professionalFeatureImage7, route: '/feedback-reviews' },

  { title: 'Job Search Optimization', description: 'Enhance your job search strategies.', image: professionalFeatureImage6, route: '/job-search-optimization' },
];

const Features = () => {
  const navigate = useNavigate();
  const featureItemsRef = useRef([]);
  const [userType, setUserType] = useState('');
  const [showFeatures, setShowFeatures] = useState(false);
  const [isUserSelected, setIsUserSelected] = useState(false);

  const handleUserTypeSelection = (type) => {
    setUserType(type);
    setShowFeatures(true);
    setIsUserSelected(true);
  };

  const featuresToShow = userType === 'student' ? studentFeatures : professionalFeatures;

  return (
    <section className="features-section">
      <div className="problem-statement">
        <h2 className="problem-heading">Don’t Walk Down the Wrong Path!</h2>
        <div className="problem-paragraph-container">
          <img src={problemImage} alt="Career Statistics" className="problem-image" />
          <p className="problem-paragraph">
            Over 1 million students each year struggle with choosing the right career path and find themselves stuck in jobs that don't align with their passions or skills. This often leads to a realization that their initial choice was a significant misstep.
          </p>
        </div>
      </div>

      {!isUserSelected && (
        <div className="user-type-selection">
          <h2 className="selection-heading">Are you a Student or a Professional?</h2>
          <div className="selection-buttons">
            <button onClick={() => handleUserTypeSelection('student')} className="user-type-button">Student</button>
            <button onClick={() => handleUserTypeSelection('professional')} className="user-type-button">Professional</button>
          </div>
        </div>
      )}

      {showFeatures && (
        <div className="dreamroute-features">
          <h2 className="features-heading">Discover Your Top Career Matches Using DreamRoute’s Cutting-Edge Technology</h2>

          {userType === 'student' && (
            <>
              <h3 className="group-heading">Career Path Selection</h3>
              <div className="features-grid two-columns">
                {featuresToShow.slice(0, 2).map((feature, index) => (
                  <div key={index} className="feature-item" ref={el => featureItemsRef.current[index] = el}>
                    <img src={feature.image} alt={feature.title} className="feature-image" />
                    <div className="feature-content">
                      <h3 className="feature-title">{feature.title}</h3>
                      <p className="feature-description">{feature.description}</p>
                      <button className="feature-button" onClick={() => navigate(feature.route)}>Let's Dive In</button>
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="group-heading">Improve Skill Level</h3>
              <div className="features-grid three-columns">
                {featuresToShow.slice(2, 5).map((feature, index) => (
                  <div key={index} className="feature-item" ref={el => featureItemsRef.current[index] = el}>
                    <img src={feature.image} alt={feature.title} className="feature-image" />
                    <div className="feature-content">
                      <h3 className="feature-title">{feature.title}</h3>
                      <p className="feature-description">{feature.description}</p>
                      <button className="feature-button" onClick={() => navigate(feature.route)}>Let's Dive In</button>
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="group-heading">Designing a Resume</h3>
              <div className="features-grid two-columns">
                {featuresToShow.slice(5, 7).map((feature, index) => (
                  <div key={index} className="feature-item" ref={el => featureItemsRef.current[index] = el}>
                    <img src={feature.image} alt={feature.title} className="feature-image" />
                    <div className="feature-content">
                      <h3 className="feature-title">{feature.title}</h3>
                      <p className="feature-description">{feature.description}</p>
                      <button className="feature-button" onClick={() => navigate(feature.route)}>Let's Dive In</button>
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="group-heading">Preparing for an Interview?</h3>
              <div className="features-grid three-columns">
                {featuresToShow.slice(7, 10).map((feature, index) => (
                  <div key={index} className="feature-item" ref={el => featureItemsRef.current[index] = el}>
                    <img src={feature.image} alt={feature.title} className="feature-image" />
                    <div className="feature-content">
                      <h3 className="feature-title">{feature.title}</h3>
                      <p className="feature-description">{feature.description}</p>
                      <button className="feature-button" onClick={() => navigate(feature.route)}>Let's Dive In</button>
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="group-heading">Find Your Dream Job</h3>
              <div className="features-grid two-columns">
                {featuresToShow.slice(10).map((feature, index) => (
                  <div key={index} className="feature-item" ref={el => featureItemsRef.current[index] = el}>
                    <img src={feature.image} alt={feature.title} className="feature-image" />
                    <div className="feature-content">
                      <h3 className="feature-title">{feature.title}</h3>
                      <p className="feature-description">{feature.description}</p>
                      <button className="feature-button" onClick={() => navigate(feature.route)}>Let's Dive In</button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

{userType === 'professional' && (
  <>
    <h3 className="group-heading">Unlock Your Potential</h3>
    <div className="features-grid two-columns">
      {professionalFeatures.slice(0, 2).map((feature, index) => (
        <div key={feature.title} className="feature-item" ref={el => featureItemsRef.current[index] = el}>
          <img src={feature.image} alt={feature.title} className="feature-image" />
          <div className="feature-content">
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
            <button className="feature-button" onClick={() => navigate(feature.route)}>Let's Dive In</button>
          </div>
        </div>
      ))}
    </div>

    <h3 className="group-heading">Enhance Your Skills</h3>
    <div className="features-grid three-columns">
      {professionalFeatures.slice(2, 5).map((feature, index) => (
        <div key={feature.title} className="feature-item" ref={el => featureItemsRef.current[index + 1] = el}>
          <img src={feature.image} alt={feature.title} className="feature-image" />
          <div className="feature-content">
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
            <button className="feature-button" onClick={() => navigate(feature.route)}>Let's Dive In</button>
          </div>
        </div>
      ))}
    </div>

    <h3 className="group-heading">Expand Your Network</h3>
    <div className="features-grid two-columns">
      {professionalFeatures.slice(5, 7).map((feature, index) => (
        <div key={feature.title} className="feature-item" ref={el => featureItemsRef.current[index + 4] = el}>
          <img src={feature.image} alt={feature.title} className="feature-image" />
          <div className="feature-content">
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
            <button className="feature-button" onClick={() => navigate(feature.route)}>Let's Dive In</button>
          </div>
        </div>
      ))}
    </div>

    <h3 className="group-heading">Boost Your Job Search</h3>
    <div className="features-grid three-columns" style={{ display: 'flex', justifyContent: 'center' }}>
      {professionalFeatures.slice(7).map((feature, index) => (
        <div key={feature.title} className="feature-item" ref={el => featureItemsRef.current[index + 5] = el} style={{ width: 'calc(66.66% - 20px)' }}>
          <img src={feature.image} alt={feature.title} className="feature-image" />
          <div className="feature-content">
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
            <button className="feature-button" onClick={() => navigate(feature.route)}>Let's Dive In</button>
          </div>
        </div>
      ))}
    </div>
  </>
)}


        </div>
      )}
    </section>
  );
};

export default Features;
