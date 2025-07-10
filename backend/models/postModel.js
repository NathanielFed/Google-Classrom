const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  message: String,
  userName: String,
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
  },
  comments: [
    {
      message: String,
      userName: String,
      createdAt: { type: Date, default: Date.now },
    },
  ],
  likes: [
    {
      userName: String,
      emoji: String
    }
  ],
  pinned: { type: Boolean, default: false },
}, {
  timestamps: true
});



module.exports = mongoose.model('Post', postSchema);
