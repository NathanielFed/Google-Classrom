import React, { useState } from 'react';
import './GradingForm.css';

const GradingForm = () => {
  const [score, setScore] = useState('');
  const [comments, setComments] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { score, comments };

    try {
      const response = await fetch('http://localhost:5000/api/grades', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        alert('Grade submitted successfully');
        setScore('');
        setComments('');
      } else {
        alert('Failed to submit grade');
      }
    } catch (error) {
      console.error(error);
      alert('Server error');
    }
  };

  return (
    <form className="grading-form" onSubmit={handleSubmit}>
      <h2>Grading Form</h2>

      <label>Score</label>
      <input
        type="number"
        placeholder="Enter score"
        value={score}
        onChange={(e) => setScore(e.target.value)}
        required
      />

      <label>Comments</label>
      <textarea
        placeholder="Enter comments..."
        value={comments}
        onChange={(e) => setComments(e.target.value)}
        required
      />

      <button type="submit">Submit</button>
    </form>
  );
};

export default GradingForm;