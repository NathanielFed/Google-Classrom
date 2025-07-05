import express from 'express';
import Class from '../models/classModel.js';

const router = express.Router();

router.post('/create', async (req, res) => {
  const { teacherID, className, section, subject, room } = req.body;

  try {
    const newClass = new Class({ teacherID, className, section, subject, room });
    await newClass.save();
    res.status(201).json({ success: true, message: 'Class saved', class: newClass });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;