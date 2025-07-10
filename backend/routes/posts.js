import express from 'express';
import Post from '../models/postModel.js';
import mongoose from 'mongoose';
const router = express.Router();

// Create a post
router.post('/', async (req, res) => {
  const { message, userName, classId } = req.body;

  if (!message || !userName || !classId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const newPost = new Post({ message, userName, classId });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    console.error('Error creating post:', err);
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// Get all posts for a specific class
router.get('/class/:classId', async (req, res) => {
  const { classId } = req.params;
  const validId = mongoose.Types.ObjectId.isValid(classId) ? new mongoose.Types.ObjectId(classId) : classId;

  const posts = await Post.find({ classId: validId }).sort({ createdAt: -1 });
  res.json(posts);
});

// Update a post by ID
router.put('/:id', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { message },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(updatedPost);
  } catch (err) {
    console.error('Error updating post:', err);
    res.status(500).json({ error: 'Failed to update post' });
  }
});

// Delete a post by ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Post.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json({ success: true });
  } catch (err) {
    console.error('Error deleting post:', err);
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

// POST /api/posts/:postId/comments
router.post('/:postId/comments', async (req, res) => {
  const { message, userName } = req.body;

  if (!message || !userName) {
    return res.status(400).json({ error: 'Missing comment fields' });
  }

  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    const comment = { message, userName, createdAt: new Date() };
    post.comments.push(comment);
    await post.save();

    res.status(201).json(comment);
  } catch (err) {
    console.error('Error adding comment:', err);
    res.status(500).json({ error: 'Failed to add comment' });
  }
});

// Toggle reaction
router.put('/:postId/react', async (req, res) => {
  const { userName, emoji } = req.body;

  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    // Remove existing reaction from this user
    post.likes = post.likes.filter((like) => like.userName !== userName);

    // Add new reaction if provided
    if (emoji) {
      post.likes.push({ userName, emoji });
    }

    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: 'Failed to react to post' });
  }
});


// Pinning a post
router.put('/:postId/pin', async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    post.pinned = !post.pinned;
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: 'Failed to toggle pin' });
  }
});


export default router;