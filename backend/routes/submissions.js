import express from 'express';
import verifyToken from '../middleware/verifyToken.js';
import Submission from '../models/submissionModel.js';
import Assignment from '../models/assignmentModel.js'; 

const router = express.Router();

router.post('/', verifyToken, async (req, res) => {
  const { assignmentId, message } = req.body;
  const studentId = req.user.id;

  try {
    const submission = new Submission({
      studentId,
      message,
    });

    await submission.save();
    res.status(201).json({ message: 'Submission successful' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit assignment' });
  }
});


router.get('/status/:assignmentId', verifyToken, async (req, res) => {
  const studentId = req.user.id;
  const { assignmentId } = req.params;

  try {
    const sub = await Submission.findOne({ assignmentId, studentId });
    if (!sub) return res.json({ status: 'pending' });

    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) return res.status(404).json({ error: 'Assignment not found' });

    const deadline = new Date(assignment.deadline);
    const onTime = sub.submittedAt <= deadline;

    res.json({
      status: onTime ? 'submitted_on_time' : 'submitted_late',
      submittedAt: sub.submittedAt,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch submission status' });
  }
});

export default router;