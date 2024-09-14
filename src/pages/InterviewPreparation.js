import React, { useState } from 'react';
import '../styles/InterviewPreparation.css';
import chatIcon from '../images/tech4.jpg';

const InterviewPreparation = () => {
  const [input, setInput] = useState('');
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async () => {
    if (input.trim() === '') return;
  
    // Add user input to the chat
    setResponses(prevResponses => [...prevResponses, { type: 'user', text: input }]);
    setLoading(true);
  
    try {
      const response = await fetch('http://localhost:5001/interview-preparation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      const responseMessages = data.map(entry => ({
        type: 'bot',
        text: entry.responses.join(' ') // Join responses if there are multiple
      }));
      
      // Only add bot responses if there was a valid response from the server
      if (responseMessages.length > 0) {
        setResponses(prevResponses => [...prevResponses, ...responseMessages]);
      }
    } catch (error) {
      console.error('Error:', error);
      setResponses(prevResponses => [...prevResponses, { type: 'bot', text: 'Sorry, something went wrong. Please try again later.' }]);
    } finally {
      setInput('');
      setLoading(false);
    }
  };
  
  const handleGuideClick = () => {
    alert('This is the Interview Preparation chatbot. Type your questions or concerns here, and it will provide responses to help you prepare for interviews.');
  };

  return (
    <div className="interview-preparation">
      <div className="chat-container">
        <div className="chat-header">
          <img src={chatIcon} alt="Chat Icon" className="chat-icon" />
          <h1 className="chat-title">Interview Coach</h1>
        </div>
        <div className="chat-box">
          {responses.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.type}`}>
              {msg.text}
            </div>
          ))}
          {loading && <div className="chat-message bot">Typing...</div>}
        </div>
        <div className="input-container">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Ask me anything..."
          />
          <button onClick={handleSubmit} className="btn-submit">Send</button>
        </div>
        <button onClick={handleGuideClick} className="btn-guide">User Guide</button>
      </div>
    </div>
  );
};

export default InterviewPreparation;
