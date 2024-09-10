const express = require('express');
const router = express.Router();
const { addQuestion } = require('../controllers/questionController');
const Question = require('../Models/question');

// Route to add a question
router.post('/questions', addQuestion);

// Route to get questions based on domain and skill level
router.get('/questions/:domain/:skillLevel', async (req, res) => {
  try {
    const { domain, skillLevel } = req.params;
    const questions = await Question.find({ domain, skillLevel });
    res.json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(400).json({ error: 'Error fetching questions.' });
  }
});

module.exports = router;
