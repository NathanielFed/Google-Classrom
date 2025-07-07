import React, { useEffect, useState } from 'react';
import './Stream.css';

const Stream = ({ classId }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [message, setMessage] = useState('');
  const [posts, setPosts] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editMessage, setEditMessage] = useState('');

  const TEMP_USER_NAME = 'Test User';      // for posts
  const TEMP_COMMENTER = 'Test Student';   // for comments

  useEffect(() => {
    if (!classId) return;

    const fetchPosts = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/posts/class/${classId}`);
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error('Error loading posts:', err);
      }
    };

    fetchPosts();
  }, [classId]);

  const post = async () => {
    if (!message.trim()) return;

    try {
      const res = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          userName: TEMP_USER_NAME,
          classId,
        }),
      });

      if (!res.ok) throw new Error('Failed to post announcement');
      const newPost = await res.json();

      setPosts((prev) => [newPost, ...prev]);
      setMessage('');
      setIsExpanded(false);
    } catch (err) {
      console.error('Error posting announcement:', err);
    }
  };

  const cancel = () => {
    setMessage('');
    setIsExpanded(false);
  };

  const startEdit = (post) => {
    setEditId(post._id);
    setEditMessage(post.message);
  };

  const saveEdit = async (postId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/posts/${postId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: editMessage }),
      });

      if (!res.ok) throw new Error('Failed to update post');
      const updated = await res.json();

      setPosts((prev) => prev.map((p) => (p._id === postId ? updated : p)));
      setEditId(null);
      setEditMessage('');
    } catch (err) {
      console.error('Error updating post:', err);
    }
  };

  const deletePost = async (postId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/posts/${postId}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete post');
      setPosts((prev) => prev.filter((p) => p._id !== postId));
    } catch (err) {
      console.error('Error deleting post:', err);
    }
  };

  const addComment = async (postId, commentText, inputRef) => {
    try {
      const res = await fetch(`http://localhost:5000/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: commentText,
          userName: TEMP_COMMENTER,
        }),
      });

      if (!res.ok) throw new Error('Failed to add comment');
      const newComment = await res.json();

      setPosts((prev) =>
        prev.map((p) =>
          p._id === postId ? { ...p, comments: [...(p.comments || []), newComment] } : p
        )
      );
      inputRef.value = '';
    } catch (err) {
      console.error('Error posting comment:', err);
    }
  };

  return (
    <div>
      {/* Announcement input */}
      <div className={`announcement-card ${isExpanded ? 'expanded' : ''}`}>
        {!isExpanded ? (
          <div className="announcement-prompt" onClick={() => setIsExpanded(true)}>
            Announce something to your class...
          </div>
        ) : (
          <>
            <textarea
              placeholder="Announce something to your class..."
              value={message}
              onChange={({ target }) => setMessage(target.value)}
              className="announcement-message-input"
              rows={5}
            />
            <div className="announcement-actions">
              <button className="cancel-btn" onClick={cancel}>Cancel</button>
              <button className="post-btn" onClick={post} disabled={!message.trim()}>Post</button>
            </div>
          </>
        )}
      </div>

      {/* Posts List */}
      {posts.length === 0 ? (
        <p>No announcements yet.</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} className="announcement-card">
            <p><strong>{post.userName}</strong></p>

            {editId === post._id ? (
              <>
                <textarea
                  value={editMessage}
                  onChange={(e) => setEditMessage(e.target.value)}
                  className="announcement-message-input"
                  rows={3}
                />
                <div className="announcement-actions">
                  <button className="cancel-btn" onClick={() => setEditId(null)}>Cancel</button>
                  <button className="post-btn" onClick={() => saveEdit(post._id)} disabled={!editMessage.trim()}>
                    Save
                  </button>
                </div>
              </>
            ) : (
              <p>{post.message}</p>
            )}

            <small>{new Date(post.createdAt).toLocaleString()}</small>

            <div className="announcement-actions">
              <button onClick={() => startEdit(post)}>Edit</button>
              <button onClick={() => deletePost(post._id)}>Delete</button>
            </div>

            {/* Comments Section */}
            <div className="comments-section">
              <h4>Comments</h4>
              <ul>
                {(post.comments || []).map((c, idx) => (
                  <li key={idx}>
                    <strong>{c.userName}</strong>: {c.message}
                    <br />
                    <small>{new Date(c.createdAt).toLocaleString()}</small>
                  </li>
                ))}
              </ul>

              {/* Add Comment */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const input = e.target.elements[`comment-${post._id}`];
                  const commentText = input.value.trim();
                  if (!commentText) return;
                  addComment(post._id, commentText, input);
                }}
              >
                <input
                  type="text"
                  name={`comment-${post._id}`}
                  placeholder="Add a comment..."
                  className="comment-input"
                />
                <button type="submit" className="comment-btn">Comment</button>
              </form>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Stream;
