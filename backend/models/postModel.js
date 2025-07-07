const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  message: { type: String, required: true },
  userName: { type: String, required: true },
  classId: { type: String, required: true },
  comments: [
    {
      userName: { type: String, required: true },
      message: { type: String, required: true },
      createdAt: { type: Date, default: Date.now }
    }
  ]
}, { timestamps: true });


module.exports = mongoose.model('Post', postSchema);
