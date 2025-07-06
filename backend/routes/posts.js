const express = require('express');
const router = express.Router();
const Post = require('../models/postModel');

// TEMP test values
const TEST_CLASS_ID = '686683e379f1cbee44feed3c'; // Use your class _id from MongoDB

router.post('/', async (req, res) => {
  try {
    const { message, userName } = req.body;

    if (!message || !userName) {
      return res.status(400).json({ error: 'Message and userName are required.' });
    }

    const post = new Post({
      message,
      userName,
      classId: TEST_CLASS_ID,
    });

    await post.save();
    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save post.' });
  }
});

module.exports = router;
