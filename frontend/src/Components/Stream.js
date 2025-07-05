import React, { useEffect, useState } from 'react';
import './Stream.css';

const Stream = ({ classId }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [message, setMessage] = useState('');
  const [posts, setPosts] = useState([]);

  const TEMP_USER_NAME = 'Test'; // 👈 Hardcoded name

  // Fetch posts for this class
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

  // Post announcement
  const post = async () => {
    if (!message.trim()) return;

    try {
      const res = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          userName: TEMP_USER_NAME,  // 👈 use hardcoded user
          classId,
        }),
      });

      if (!res.ok) throw new Error('Failed to post announcement');
      const newPost = await res.json();

      setPosts((prev) => [newPost, ...prev]); // add new post to top
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

  return (
    <div>
      {/* Posting UI */}
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
              <button className="cancel-btn" onClick={cancel}>
                Cancel
              </button>
              <button className="post-btn" onClick={post} disabled={!message.trim()}>
                Post
              </button>
            </div>
          </>
        )}
      </div>

      {/* Display Posts */}
      <div className="announcement-list">
        {posts.length === 0 ? (
          <p>No announcements yet.</p>
        ) : (
          posts.map((post) => (
            <div key={post._id} className="announcement-card">
              <p><strong>{post.userName}</strong></p>
              <p>{post.message}</p>
              <small>{new Date(post.createdAt).toLocaleString()}</small>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Stream;
