import express from 'express';
const router = express.Router();
import Assignment from '../models/assignmentModel.js';
import verifyToken from '../middleware/verifyToken.js';

router.post('/', verifyToken, async (req, res) => {
  const { title, instructions, deadline, classroomId } = req.body;
  const teacherId = req.user.id;

  try {
    const newAssignment = new Assignment({
      title,
      instructions,
      deadline,
      classroomId,
      teacher: teacherId,
    });

    const saved = await newAssignment.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('Error saving assignment:', err);
    res.status(500).json({ error: 'Failed to save assignment' });
  }
});

router.get('/classroom/:classroomId', async (req, res) => {
  const { classroomId } = req.params;

  try {
    const assignments = await Assignment.find({ classroomId });

    res.status(200).json(assignments);
  } catch (err) {
    console.error('Error fetching assignments:', err);
    res.status(500).json({ error: 'Failed to fetch assignments' });
  }
});

export default router;
