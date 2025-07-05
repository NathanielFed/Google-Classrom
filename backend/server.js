import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
import classRoutes from './routes/classRoutes.js';
<<<<<<< HEAD
import assignmentRoutes from './routes/assignments.js';
=======
import postRoutes from './routes/posts.js'
>>>>>>> 5b8030b4eff920b5fb12fdd188c63b8004ccdd25

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB error:', err));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/classes', classRoutes);
<<<<<<< HEAD
app.use('/api/assignments', assignmentRoutes); 
=======
app.use('/api/posts', postRoutes);
>>>>>>> 5b8030b4eff920b5fb12fdd188c63b8004ccdd25

// Server start
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
