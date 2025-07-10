<<<<<<< HEAD:backend/app.js
const express = require('express');
const connectDB = require('./config/db');
const assignmentRoutes = require('./routes/Assignments');
const cors = require('cors');
require('dotenv').config();
=======
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
import classRoutes from './routes/classRoutes.js';
import postRoutes from './routes/posts.js';
import assignments from './routes/assignments.js';
import submissions from './routes/submissions.js';

dotenv.config();
>>>>>>> 83a064180d3146f71c1a80f64831c4e66b0df23e:backend/server.js

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

<<<<<<< HEAD:backend/app.js
app.use('/api/assignments', assignmentRoutes);
=======
// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB error:', err));

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/assignments', assignments);
app.use('/api/submissions', submissions);
>>>>>>> 83a064180d3146f71c1a80f64831c4e66b0df23e:backend/server.js

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));