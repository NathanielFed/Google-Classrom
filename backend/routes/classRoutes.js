import express from 'express';
import Class from '../models/classModel.js';

const router = express.Router();

router.post('/create', async (req, res) => {
  const { teacherID, className, section, subject, room, classCode } = req.body;

  try {
    const newClass = new Class({ teacherID, className, section, subject, room, classCode });
    await newClass.save();
    res.status(201).json({ success: true, message: 'Class saved', class: newClass });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});



router.post('/join', async (req, res) => {
  const { classCode, userId } = req.body;

  if (!classCode || !userId) {
    return res.status(400).json({ success: false, error: 'classCode and userId are required' });
  }

  try {
    const classroom = await Class.findOne({classCode});
    if (!classroom) {
      return res.status(404).json({ success: false, error: 'Class not found' });
    }

    // Prevent duplicate join
    if (classroom.students.includes(userId)) {
      return res.status(400).json({ success: false, error: 'User already joined this class' });
    }

    // Add student ID to class
    classroom.students.push(userId);
    await classroom.save();

    res.status(200).json({ success: true, message: 'Successfully joined the class' });
  } catch (err) {
    console.error('Error joining class:', err);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

export default router;