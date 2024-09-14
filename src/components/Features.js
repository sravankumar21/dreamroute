import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Features.css';
import problemImage from '../images/rightcareer.jpg';
import featureImage1 from '../images/tech2.jpg';
import featureImage2 from '../images/tech3.jpg';
import featureImage3 from '../images/tech4.jpg';
import featureImage4 from '../images/technology.jpg';
import featureImage5 from '../images/tech5.jpg';
import featureImage6 from '../images/tech6.jpg';
import featureImage7 from '../images/tech7.jpg';
import featureImage8 from '../images/tech8.avif';

const featuresData = [
  { title: 'Career Coach', description: 'Engage in real-time conversations tailored to your career goals.', image: featureImage1, route: '/career-coach' },
  { title: 'Resume Enhancer', description: 'Craft standout resumes with guided templates and tips.', image: featureImage2, route: '/resume-builder' },
  { title: 'Interview Prep', description: 'Prepare for interviews with tailored questions and feedback.', image: featureImage3, route: '/interview-prep' },
  { title: 'Career Path Finder', description: 'Discover potential career paths based on your skills.', image: featureImage4, route: '/path-finder' },
  { title: 'Skill Evaluator', description: 'Assess and improve your skills with interactive evaluations.', image: featureImage5, route: '/student-skill-evaluator' },
  { title: 'Job Matcher', description: 'Match your profile with job opportunities.', image: featureImage6, route: '/job-matcher' },
  { title: 'Quick Revision', description: 'Learn Quick.', image: featureImage7, route: '/quick-revision' },
  { title: 'Find Opportunities', description: 'Land on your dream job.', image: featureImage8, route: '/find-opportunity' },
];

const Features = () => {
  const navigate = useNavigate();
  const featureItemsRef = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      const elements = featureItemsRef.current;
      elements.forEach(element => {
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            element.classList.add('animate');
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check in case elements are already in view

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="features-section">
      <div className="problem-statement">
        <h2 className="problem-heading">Don’t Walk Down the Wrong Path!</h2>
        <div className="problem-paragraph-container">
          <img 
            src={problemImage} 
            alt="Career Statistics" 
            className="problem-image"
          />
          <p className="problem-paragraph">
            Over 1 million students each year struggle with choosing the right career path and find themselves stuck in jobs that don't align with their passions or skills. This often leads to a realization that their initial choice was a significant misstep.
          </p>
        </div>
      </div>
      <div className="dreamroute-features">
        <h2 className="features-heading">
          Discover Your Top Career Matches<br />
          Using DreamRoute’s Cutting-Edge Technology
        </h2>
        <h3 className="features-subheading">
          Explore our suite of intelligent chatbots designed to elevate your career with personalized, actionable guidance.
        </h3>
        <div className="features-grid">
          {featuresData.map((feature, index) => (
            <div
              key={index}
              className="feature-item"
              ref={el => featureItemsRef.current[index] = el}
            >
              <img src={feature.image} alt={feature.title} className="feature-image" />
              <div className="feature-content">
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
                <button 
                  className="feature-button" 
                  onClick={() => navigate(feature.route)}
                >
                  Let's Dive In
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
