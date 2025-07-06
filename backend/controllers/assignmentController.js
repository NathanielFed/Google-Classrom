const Assignment = require('../models/Assignment');

exports.getAllAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find();
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateAssignment = async (req, res) => {
  try {
    const { id } = req.params;
    const { grade, comment, returned } = req.body;

    const updated = await Assignment.findByIdAndUpdate(
      id,
      { grade, comment, returned },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};