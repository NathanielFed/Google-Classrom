  const express = require('express');
  const router = express.Router();
  const Assignment = require('../models/assignmentModel');
  const verifyToken = require('../middleware/verifyToken');

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

  module.exports = router;