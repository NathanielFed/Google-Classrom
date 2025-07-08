import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js"; 

const router = express.Router();

router.post("/register", async (req, res) => {
  const { email, name, password } = req.body;

  try {
    let existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      name: name || email.split("@")[0],
      password: hashedPassword,
      loginType: "manual",
    });

      await newUser.save();

    res.status(200).json({ message: "User login success", newUser });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Server error" });
  }
});
router.post("/login", async (req, res) => {
  
  const { email, password, name, loginType = "manual" } = req.body;
  console.log(req.body);
  try {
    let user = await User.findOne({ email });

   if (!user) {
      user = new User({
        email,
        name,
        loginType,
        password: null, // Google users don't need password
      });

      await user.save();
    }

    // Manual login check
    if (loginType === "manual") {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );


    res.status(200).json({ message: "Login successful", user, token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/test", (req, res) => {
  res.send("✅ userRoutes is working");
});

export default router;