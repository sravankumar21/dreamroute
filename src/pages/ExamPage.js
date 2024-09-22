import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/ExamPage.css';

const ExamPage = () => {
  const { domain } = useParams();
  const [questions, setQuestions] = useState([]);
  const [skillLevel, setSkillLevel] = useState('beginner'); // Default skill level
  const [aptitudeTopic, setAptitudeTopic] = useState('Aptitude'); // Default topic for Aptitude
  const [isAptitude, setIsAptitude] = useState(false); // Track if the current domain is Aptitude
  const [score, setScore] = useState(null);
  const [showTutorials, setShowTutorials] = useState(false);
  const [answers, setAnswers] = useState({});
  const [correctAnswers, setCorrectAnswers] = useState({});

  useEffect(() => {
    // Check if the domain is aptitude
    setIsAptitude(domain.toLowerCase() === 'aptitude');

    const fetchQuestions = async () => {
      try {
        const level = isAptitude ? aptitudeTopic : skillLevel; // Use topic for Aptitude
        const response = await axios.get(`http://localhost:4000/api/questions/${domain}/${level}`);
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions', error);
      }
    };

    fetchQuestions();
  }, [domain, skillLevel, aptitudeTopic, isAptitude]);

  const handleSkillLevelChange = (level) => {
    setSkillLevel(level);
  };

  const handleAptitudeTopicChange = (topic) => {
    setAptitudeTopic(topic);
  };

  const handleAnswerChange = (questionIndex, answer) => {
    setAnswers({
      ...answers,
      [questionIndex]: answer
    });
  };

  const handleSubmit = () => {
    let currentScore = 0;
    const tempCorrectAnswers = {};

    questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        currentScore++;
      } else {
        tempCorrectAnswers[index] = question.correctAnswer;
      }
    });

    setScore(currentScore);
    setCorrectAnswers(tempCorrectAnswers);
    setShowTutorials(currentScore < 3);
  };

  return (
    <div className="exam-page">
      <h1>Exam for {domain}</h1>

      {isAptitude ? (
        <div className="aptitude-topic-buttons">
          <button onClick={() => handleAptitudeTopicChange('Aptitude')} className={aptitudeTopic === 'Aptitude' ? 'active' : ''}>Aptitude</button>
          <button onClick={() => handleAptitudeTopicChange('Reasoning')} className={aptitudeTopic === 'Reasoning' ? 'active' : ''}>Reasoning</button>
          <button onClick={() => handleAptitudeTopicChange('Time and Work')} className={aptitudeTopic === 'Time and Work' ? 'active' : ''}>Time and Work</button>
          {/* Add more aptitude topics as needed */}
        </div>
      ) : (
        <div className="skill-level-buttons">
          <button onClick={() => handleSkillLevelChange('beginner')} className={skillLevel === 'beginner' ? 'active' : ''}>Beginner</button>
          <button onClick={() => handleSkillLevelChange('pro')} className={skillLevel === 'pro' ? 'active' : ''}>Pro</button>
          <button onClick={() => handleSkillLevelChange('advanced')} className={skillLevel === 'advanced' ? 'active' : ''}>Advanced</button>
        </div>
      )}

      <div className="questions-container">
        {questions.map((question, index) => (
          <div key={index} className="question-card">
            <p>{question.question}</p>
            {question.options.map((option, idx) => (
              <div key={idx}>
                <input
                  type="radio"
                  id={`q${index}o${idx}`}
                  name={`q${index}`}
                  value={option}
                  checked={answers[index] === option}
                  onChange={() => handleAnswerChange(index, option)}
                />
                <label htmlFor={`q${index}o${idx}`}>{option}</label>
              </div>
            ))}
            {score !== null && answers[index] !== undefined && answers[index] !== questions[index].correctAnswer && (
              <p className="correct-answer">
                Correct Answer: {correctAnswers[index]}
              </p>
            )}
          </div>
        ))}
      </div>

      <button className="submit-button" onClick={handleSubmit}>Submit</button>

      {score !== null && (
        <div className="score-container">
          <p>Score: {score}</p>
        </div>
      )}

      {showTutorials && (
        <div className="tutorials-container">
          <h2>Recommended Tutorials:</h2>
          <ul>
            <li><a href="https://www.w3schools.com" target="_blank" rel="noopener noreferrer">W3Schools</a></li>
            <li><a href="https://www.tutorialspoint.com" target="_blank" rel="noopener noreferrer">TutorialsPoint</a></li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ExamPage;
