import mongoose from 'mongoose';

const assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  instructions: { type: String, required: true },
  deadline: { type: Date, required: true },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Assignment = mongoose.model('Assignment', assignmentSchema);
export default Assignment;