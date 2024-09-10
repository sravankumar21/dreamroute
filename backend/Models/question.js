const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  domain: { type: String, required: true },
  domainType: { type: String, required: true },
  question: { type: String, required: true },
  options: { type: [String], required: true },
  correctAnswer: { type: String, required: true },
  skillLevel: { type: String, required: true }  // Added field
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
