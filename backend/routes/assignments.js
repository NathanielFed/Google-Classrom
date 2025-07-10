import express from 'express';
import Assignment from '../models/assignmentModel.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

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

    await newAssignment.save();
    res.status(201).json({ success: true, data: newAssignment });
  } catch (err) {
    console.error('Error creating assignment:', err.message);
    res.status(500).json({ error: 'Failed to create assignment' });
  }
});

router.get('/:classroomId', async (req, res) => {
  const { classroomId } = req.params;

  try {
    const now = new Date();
    const assignments = await Assignment.find({
      classroomId: classroomId,
      deadline: { $gte: now },
    }).sort({ deadline: 1 });

    res.status(200).json(assignments);
  } catch (err) {
    console.error('Error fetching assignments:', err);
    res.status(500).json({ error: 'Failed to fetch assignments' });
  }
});

export default router;
