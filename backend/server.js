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

console.log("🔑 JWT Secret loaded:", process.env.JWT_SECRET);


const app = express();
app.use(cors());
app.use(express.json());

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));