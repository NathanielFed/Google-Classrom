import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  message: { type: String, required: true },
  classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
  userName: { type: String, required: true }, // replaced userId with simple name for now
  createdAt: { type: Date, default: Date.now },
});

const Post = mongoose.model("Post", postSchema);
export default Post;

