const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const { authRoutes } = require('./routes/auth');
const { quizRoutes } = require('./routes/quiz');
const { connection } = require('./config/db');

const port = process.env.PORT || 8000;

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/quizzes', quizRoutes);

app.listen(port, async () => {
    try {
      await connection;
      console.log('Server Connected with Atlas');
    } catch (err) {
      console.log('Database connection error:', err); // Log any DB connection errors
    }
    console.log(`Server is started on port ${port}`);
  });
  
