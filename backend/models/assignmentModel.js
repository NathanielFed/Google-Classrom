import mongoose from 'mongoose';

const assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  instructions: String,
  deadline: Date,
  classroomId: { type: String, required: true },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

const Assignment = mongoose.model('Assignment', assignmentSchema);

export default Assignment;