import User from "../models/userModel.js";
import express from "express";

const router = express.Router();

router.post("/login-or-register", async (req, res) => {
  const { email, name, picture, password, loginType } = req.body;

  try {
    let user = await User.findOne({ email });

    // If user doesn't exist, create it
    if (!user) {
      user = new User({
        email,
        name: name || email.split("@")[0],
        picture: picture || "",
        password: password || "",
        loginType,
      });
      await user.save();
    }

    res.status(200).json({ message: "User login/register success", user });
  } catch (err) {
    console.error("DB error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get('/test-db', async (req, res) => {
  try {
    const users = await User.find().limit(1);
    res.status(200).json({ success: true, message: 'Database is working', users });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Database error', error });
  }
});

router.get('/users', async (req, res) => {
  try {
    const users = await User.find().limit(1);
    res.status(200).json({ success: true, message: 'Database is working', users });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Database error', error });
  }
});

export default router;