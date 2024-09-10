// controllers/opportunityController.js
const Opportunity = require('../Models/Opportunity');

// Get all opportunities
exports.getOpportunities = async (req, res) => {
  try {
    const opportunities = await Opportunity.find();
    res.json(opportunities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new opportunity
exports.createOpportunity = async (req, res) => {
  const { company, role, fullTime, type, location, applicationLink } = req.body;

  const newOpportunity = new Opportunity({
    company,
    role,
    fullTime,
    type,
    location,
    applicationLink
  });

  try {
    const savedOpportunity = await newOpportunity.save();
    res.status(201).json(savedOpportunity);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
