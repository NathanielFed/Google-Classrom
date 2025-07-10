const express = require('express');
const router = express.Router();
const Assignment = require('../models/Assignment');

router.get('/', async (req, res) => {
  try {
    const assignments = await Assignment.find();
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { grade, comment } = req.body;
    const assignment = await Assignment.findByIdAndUpdate(
      req.params.id,
      { grade, comment, returned: true },
      { new: true }
    );
    res.json(assignment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) return res.status(404).json({ error: 'Not found' });
    res.json(assignment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;