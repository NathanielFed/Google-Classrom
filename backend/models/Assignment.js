const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  submissionPreview: { type: String },
  grade: { type: Number },
  comment: { type: String },
  returned: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Assignment', assignmentSchema);