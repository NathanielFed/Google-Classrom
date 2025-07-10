import express from 'express';
import Assignment from '../models/assignmentModel.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/', verifyToken, async (req, res) => {
  const { title, instructions, deadline, classroomId } = req.body;
  const teacherId = req.user.id;

  // Get assignments by classroomId
router.get('/:classroomId', verifyToken, async (req, res) => {
  try {
    const assignments = await Assignment.find({ classroomId: req.params.classroomId });
    res.status(200).json(assignments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch assignments' });
  }
});

  try {
    // ✅ Step: Create the assignment only
    const newAssignment = new Assignment({
      title,
      instructions,
      deadline,
      classroomId,
      teacher: teacherId,
    });

    await newAssignment.save();

    res.status(201).json({
      success: true,
      data: newAssignment,
    });
  } catch (err) {
    console.error('❌ Error creating assignment:', err.message);
    res.status(500).json({ error: 'Failed to create assignment' });
  }
});

export default router;