// src/About.js
import React from 'react';
import '../styles/About.css'; // Import your CSS file

// Importing local images
import AliceImage from '../images/tech2.jpg';
import BobImage from '../images/tech2.jpg';
import CharlieImage from '../images/tech2.jpg';
import DianaImage from '../images/tech2.jpg';
import EthanImage from '../images/tech2.jpg';
import FionaImage from '../images/tech2.jpg';

const teamMembers = [
  { name: 'KOTLA GEETHIKA', image: AliceImage },
  { name: 'BATTU SRAVAN KUMAR', image: BobImage },
  { name: 'SAI GANESH MONAJI', image: CharlieImage },
  { name: 'SAI GEETHIKA', image: DianaImage },
  { name: 'MANDA SRINATH', image: EthanImage },
  { name: 'SHAGUFTHA ZABEEN', image: FionaImage },
];

const About = () => {
  return (
    <div className="container text-center my-5">
      <h1 className="mb-3">Our Team</h1>
      <h3 className="mb-5 subheading">TRAILBLAZERS</h3>
      <div className="row">
        {teamMembers.map((member, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="team-member">
              <img src={member.image} alt={member.name} className="img-fluid rounded-circle mb-2 team-image" />
              <h5 className="team-name">{member.name}</h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
