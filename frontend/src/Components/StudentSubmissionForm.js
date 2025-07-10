import React, { useState } from 'react';

const StudentSubmissionForm = ({ assignmentId }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    try {
      const res = await fetch('http://localhost:5000/api/submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ assignmentId, message }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Submission failed');
      alert('Submitted successfully!');
      setMessage('');
    } catch (err) {
      console.error(err);
      alert('Submission failed');
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '20px', 
        padding: '20px', 
        backgroundColor: '#ffffff', 
        borderRadius: '10px', 
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' 
      }}
    >
      <h3 style={{ margin: 0, textAlign: 'center', color: '#333' }}>
        Submit Assignment
      </h3>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Write an optional message..."
        rows={6}
        style={{
          padding: '12px',
          borderRadius: '6px',
          border: '1px solid #ccc',
          resize: 'vertical',
          fontSize: '15px'
        }}
      />

      <button
        type="submit"
        style={{
          padding: '12px',
          backgroundColor: '#4CAF50',
          color: '#fff',
          fontWeight: 'bold',
          fontSize: '16px',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}
      >
        Submit
      </button>
    </form>
  );
};

export default StudentSubmissionForm;