import User from "../models/userModel.js";
import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password} = req.body;

  try {
    let user = await User.findOne({ email });

    // If user doesn't exist, create it
    if (!user) {
      user = new User({
        email,
        password: password || "",
      });
      await user.save();
    }

    res.status(200).json({ message: "User login success", user });
  } catch (err) {
    console.error("DB error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/register", async (req, res) => {
  const { email, name, password, userType } = req.body;

  try {
    let user = await User.findOne({ email });

    // If user doesn't exist, create it
    if (!user) {
      user = new User({
        email,
        name: name || email.split("@")[0],
        password: password || "",
        loginType,
      });
      await user.save();
    } else {
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({ message: "User login/register success", user, token });
  } catch (err) {
    console.error("DB error:", err);
    res.status(500).json({ error: "Server error" });
  }
});


export default router;