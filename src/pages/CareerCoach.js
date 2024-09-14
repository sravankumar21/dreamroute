import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import '../styles/CareerCoach.css'; // Ensure your CSS file is correctly imported
import coachIcon from '../images/tech8.avif'; // Add an image for the career coach

const CareerCoach = () => {
  const [text, setText] = useState('');
  const [responses, setResponses] = useState([]);

  // Speech recognition hooks
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  // Update the text state with the current transcript in real time
  useEffect(() => {
    setText(transcript);
  }, [transcript]);

  // Check if the browser supports speech recognition
  if (!browserSupportsSpeechRecognition) {
    return <p>Your browser does not support speech recognition.</p>;
  }

  const handleSpeechToText = () => {
    SpeechRecognition.startListening({ continuous: true, interimResults: true });
  };

  const handleStopSpeechToText = () => {
    SpeechRecognition.stopListening();
  };

  const handleSubmit = async () => {
    if (text.trim() === '') return;
    setResponses([...responses, { type: 'user', text }]);

    try {
      const response = await fetch('/api/career-coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });

      const data = await response.json();
      setResponses((prev) => [
        ...prev,
        { type: 'bot', text: data.response },
      ]);
      setText('');
      resetTranscript();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleGuideClick = () => {
    alert('This is the Career Coach chatbot. Use the voice-to-text feature to speak your queries, or type them directly for career advice and guidance.');
  };

  return (
    <div className="career-coach">
      <div className="sidebar">
        <img src={coachIcon} alt="Coach Icon" className="coach-icon" />
        <h1 className="coach-title">Career Coach</h1>
        <button onClick={handleSpeechToText} className="btn btn-success">
          {listening ? 'Listening...' : 'Start Speaking'}
        </button>
        <button onClick={handleStopSpeechToText} className="btn btn-danger">Stop</button>
        <button onClick={handleGuideClick} className="btn btn-guide">User Guide</button>
      </div>
      <div className="chat2-container">
        <div className="chat-box">
          {responses.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.type}`}>
              {msg.text}
            </div>
          ))}
        </div>
        <div className="input-container">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Ask me about your career..."
          />
          <button onClick={handleSubmit} className="btn-submit">Send</button>
        </div>
      </div>
    </div>
  );
};

export default CareerCoach;
