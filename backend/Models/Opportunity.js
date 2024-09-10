// models/Opportunity.js
const mongoose = require('mongoose');

const opportunitySchema = new mongoose.Schema({
  company: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  fullTime: {
    type: Boolean,
    required: true
  },
  type: {
    type: String,
    enum: ['internship', 'job'],
    required: true
  },
  location: {
    type: String,
    required: true
  },
  applicationLink: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Opportunity', opportunitySchema);
