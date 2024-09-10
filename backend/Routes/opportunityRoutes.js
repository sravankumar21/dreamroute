// routes/opportunityRoutes.js
const express = require('express');
const router = express.Router();
const opportunityController = require('../Controllers/opportunityController');

// Get all opportunities
router.get('/', opportunityController.getOpportunities);

// Create a new opportunity
router.post('/', opportunityController.createOpportunity);

module.exports = router;
