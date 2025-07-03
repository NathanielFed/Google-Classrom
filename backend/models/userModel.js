import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: String,
  picture: String,
  password: String, // optional for Google users
  loginType: String, // "google" or "manual"
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;
