const Question = require('../Models/question'); // Ensure correct path to the model

const addQuestion = async (req, res) => {
  try {
    const { domain, domainType, question, options, correctAnswer, skillLevel } = req.body;

    // Create a new question
    const newQuestion = new Question({
      domain,
      domainType,
      question,
      options,
      correctAnswer,
      skillLevel  // Added field
    });

    // Save the question to the database
    await newQuestion.save();
    res.status(201).json({ message: 'Question added successfully!' });
  } catch (error) {
    console.error('Error adding question:', error);
    res.status(400).json({ error: 'Error adding question.' });
  }
};

module.exports = {
  addQuestion
};
