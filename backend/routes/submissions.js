import express from 'express';
import verifyToken from '../middleware/verifyToken.js';
import Submission from '../models/submissionModel.js';

const router = express.Router();

router.post('/', verifyToken, async (req, res) => {
  const { assignmentId, message } = req.body;
  const studentId = req.user.id;

  try {
    const submission = new Submission({
      assignmentId,
      studentId,
      message,
    });

    await submission.save();
    res.status(201).json({ message: 'Submission successful' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit assignment' });
  }
});

export default router;