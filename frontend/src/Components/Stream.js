import React, { useState } from 'react';
import './Stream.css';

const Stream = ({ onPostAnnouncement }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [message, setMessage] = useState('');

  const post = () => {
    if (message.trim()) {
      onPostAnnouncement({ message });
      setMessage('');
      setIsExpanded(false);
    }
  };

  const cancel = () => {
    setMessage('');
    setIsExpanded(false);
  };

  return (
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
            rows={isExpanded ? 5 : 1}
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
  );
};

export default Stream;