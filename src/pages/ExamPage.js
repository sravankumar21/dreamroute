import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/ExamPage.css'; // Import your CSS file

const ExamPage = () => {
  const { domain } = useParams();
  const [questions, setQuestions] = useState([]);
  const [skillLevel, setSkillLevel] = useState('beginner');
  const [score, setScore] = useState(null); // Initially null to indicate not yet submitted
  const [showTutorials, setShowTutorials] = useState(false);
  const [answers, setAnswers] = useState({}); // To store user's answers
  const [correctAnswers, setCorrectAnswers] = useState({}); // To store correct answers for incorrect responses

  useEffect(() => {
    // Fetch questions based on domain and skill level
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/questions/${domain}/${skillLevel}`);
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions', error);
      }
    };

    fetchQuestions();
  }, [domain, skillLevel]);

  const handleSkillLevelChange = (level) => {
    setSkillLevel(level);
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
        // Store the correct answer if the selected answer is incorrect
        tempCorrectAnswers[index] = question.correctAnswer;
      }
    });

    // Update the score and correct answers
    setScore(currentScore);
    setCorrectAnswers(tempCorrectAnswers);

    // Show tutorials if the score is less than a threshold
    setShowTutorials(currentScore < 3);
  };

  return (
    <div className="exam-page">
      <h1>Exam for {domain}</h1>
      
      <div className="skill-level-buttons">
        <button
          onClick={() => handleSkillLevelChange('beginner')}
          className={skillLevel === 'beginner' ? 'active' : ''}
        >
          Beginner
        </button>
        <button
          onClick={() => handleSkillLevelChange('pro')}
          className={skillLevel === 'pro' ? 'active' : ''}
        >
          Pro
        </button>
        <button
          onClick={() => handleSkillLevelChange('advanced')}
          className={skillLevel === 'advanced' ? 'active' : ''}
        >
          Advanced
        </button>
      </div>

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
            {/* Display correct answer only after submission */}
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
