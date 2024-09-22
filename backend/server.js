// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const questionRoutes = require('./Routes/questionRoutes');
const opportunityRoutes = require('./Routes/opportunityRoutes');
const authRoutes = require('./Routes/authRoutes'); // Import auth routes

const app = express();
const PORT = process.env.PORT || 4000;
const MONGO_URI = 'mongodb+srv://sra1kumar218:sra1kumar218@cluster0.hy5pv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Middleware
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.json());

// Routes
app.use('/api', questionRoutes);
app.use('/addjobs', opportunityRoutes);
app.use('/auth', authRoutes); // Use auth routes

// Connect to MongoDB and start the server
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully.');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error.message);
  });
