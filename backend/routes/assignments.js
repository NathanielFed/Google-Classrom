// routes/assignments.js
import express from 'express';
import Assignment from '../models/assignmentModel.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/', verifyToken, async (req, res) => {
  const { title, instructions, deadline, classroomId } = req.body;
  const teacherId = req.user.id;

  console.log('📌 Creating Assignment:', { title, instructions, deadline, classroomId, teacherId });

  try {
    const newAssignment = new Assignment({
      title,
      instructions,
      deadline,
      teacher: teacherId,
    });

    await newAssignment.save();

    console.log('✅ Assignment saved to DB:', newAssignment);
    res.status(201).json({ success: true, data: newAssignment });
  } catch (err) {
    console.error('❌ Error creating assignment:', err.message);
    res.status(500).json({ error: err.message });
  }
});

export default router;