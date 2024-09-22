import React, { useState } from 'react';
import { Dropdown, Button, Card, Row, Col } from 'react-bootstrap';
import '../styles/ResourceLibrary.css'; // Custom CSS for styling

// Import images
import striverImg from '../images/striver.webp';
import apnaCollegeImg from '../images/apnacollegeofficial.webp';
import abdulBariImg from '../images/youtube.webp';
import teluskoImg from '../images/youtube.webp';
import codeHelpImg from '../images/youtube.webp';
import freeCodeCampImg from '../images/youtube.webp';
import traversyImg from '../images/youtube.webp';
import netNinjaImg from '../images/youtube.webp';
import pythonImg from '../images/youtube.webp';
import pythonProgrammingImg from '../images/youtube.webp';
import reactImg from '../images/youtube.webp';
import oopImg from '../images/youtube.webp';
import dbmsImg from '../images/youtube.webp';
import hackerRankImg from '../images/leetcode.webp'; // Example practice logo
import leetcodeImg from '../images/hackerrank.webp'; // Example practice logo

// Sample data for resources
const resources = {
  youtube: {
    dsa: [
      { title: 'DSA by Striver', description: 'Comprehensive DSA tutorial by Striver.', image: striverImg, link: 'https://youtube.com/playlist?list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz&si=HocgNVhLVIUC192U' },
      { title: 'DSA by Apna College', description: 'Learn DSA with Apna College.', image: apnaCollegeImg, link: 'https://youtube.com/playlist?list=PLfqMhTWNBTe3LtFWcvwpqTkUSlB32kJop&si=5LTwvdgGSbcNFvyz' },
      { title: 'DSA by Abdul Bari', description: 'DSA made easy by Abdul Bari.', image: abdulBariImg, link: 'https://www.youtube.com/abdulbari' },
      { title: 'DSA by Telusko', description: 'Master DSA with Telusko.', image: teluskoImg, link: 'https://www.youtube.com/telusko' },
      { title: 'DSA by CodeHelp', description: 'CodeHelp DSA tutorial.', image: codeHelpImg, link: 'https://www.youtube.com/codehelp' },
    ],
    webDevelopment: [
      { title: 'Web Dev by FreeCodeCamp', description: 'Complete web development tutorial.', image: freeCodeCampImg, link: 'https://www.youtube.com/freecodecamp' },
      { title: 'Web Dev by Traversy Media', description: 'Modern web development by Traversy Media.', image: traversyImg, link: 'https://www.youtube.com/traversymedia' },
      { title: 'Web Dev by Net Ninja', description: 'Web dev tutorials by Net Ninja.', image: netNinjaImg, link: 'https://www.youtube.com/thenetninja' },
    ],
  },
  tutorials: {
    python: [
      { title: 'Python Tutorial', description: 'Comprehensive Python tutorial for all levels.', image: pythonImg, link: 'https://www.tutorialspoint.com/python' },
      { title: 'Python Programming', description: 'Learn Python programming from scratch.', image: pythonProgrammingImg, link: 'https://www.geeksforgeeks.org/python' },
    ],
    react: [
      { title: 'React.js Guide', description: 'Learn React from the ground up.', image: reactImg, link: 'https://reactjs.org/tutorial' },
    ],
  },
  documents: {
    oop: [
      { title: 'OOP Concepts', description: 'An introduction to Object-Oriented Programming.', image: oopImg, link: 'https://docs.oop.com' },
    ],
    dbms: [
      { title: 'Database Management', description: 'Learn the fundamentals of DBMS.', image: dbmsImg, link: 'https://dbms.docs.com' },
    ],
  },
  practice: [
    { title: 'HackerRank', description: 'Practice coding problems on HackerRank.', image: hackerRankImg, link: 'https://www.hackerrank.com' },
    { title: 'LeetCode', description: 'Solve coding challenges on LeetCode.', image: leetcodeImg, link: 'https://leetcode.com' },
    // Add other practice platforms here...
  ],
};

const ResourceLibrary = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSubCategory, setActiveSubCategory] = useState(null);

  const handleDropdownClick = (category, subCategory) => {
    setActiveCategory(category);
    setActiveSubCategory(subCategory);
  };

  return (
    <div className="resource-library">
      <h1 className="library-heading">Resource Library</h1>
      <div className="resource-buttons">
        <Dropdown>
          <Dropdown.Toggle variant="primary">YouTube</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleDropdownClick('youtube', 'dsa')}>DSA</Dropdown.Item>
            <Dropdown.Item onClick={() => handleDropdownClick('youtube', 'webDevelopment')}>Web Development</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown>
          <Dropdown.Toggle variant="primary">Tutorials</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleDropdownClick('tutorials', 'python')}>Python</Dropdown.Item>
            <Dropdown.Item onClick={() => handleDropdownClick('tutorials', 'react')}>React</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown>
          <Dropdown.Toggle variant="primary">Documents</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleDropdownClick('documents', 'oop')}>OOP</Dropdown.Item>
            <Dropdown.Item onClick={() => handleDropdownClick('documents', 'dbms')}>DBMS</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown>
          <Dropdown.Toggle variant="primary">Practice</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleDropdownClick('practice')}>Practice Platforms</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <div className="resource-cards">
        {activeCategory && activeSubCategory && (
          <Row>
            {resources[activeCategory][activeSubCategory].map((resource, index) => (
              <Col key={index} md={4}>
                <Card className="resource-card" style={{ height: '300px' }}>
                  <Card.Img variant="top" src={resource.image} alt={resource.title} />
                  <Card.Body>
                    <Card.Title>{resource.title}</Card.Title>
                    <Card.Text>{resource.description}</Card.Text>
                    <Button variant="primary" href={resource.link} target="_blank">
                      Learn
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        {activeCategory === 'practice' && (
          <Row>
            {resources.practice.map((platform, index) => (
              <Col key={index} md={12}>
                <Card className="resource-card-wide">
                  <Row className="align-items-center">
                    <Col md={3}>
                      <Card.Img variant="left" src={platform.image} alt={platform.title} />
                    </Col>
                    <Col md={6}>
                      <Card.Body>
                        <Card.Title>{platform.title}</Card.Title>
                        <Card.Text>{platform.description}</Card.Text>
                      </Card.Body>
                      <Col md={3}>
                      <Button variant="primary" href={platform.link} target="_blank">
                        Go
                      </Button>
                    </Col>
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
};

export default ResourceLibrary;
