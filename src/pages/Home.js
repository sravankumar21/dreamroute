import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Features from '../components/Features'; // Import the Features component
import careerImage from '../images/shapecareer2.jpg'; // Career image
import '../styles/Home.css'; // Import the custom CSS file

const Home = () => {
  return (
    <div>
      <Navbar />
      <main className="container mx-auto p-4">
        <img 
          src={careerImage} 
          alt="Career Pathway" 
          className="career-image"
        />
        <Features /> {/* Include the Features component */}
      </main>
      <Footer />
    </div>
  );
};

export default Home;
