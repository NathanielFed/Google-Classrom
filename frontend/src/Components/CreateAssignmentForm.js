import React, { useState } from 'react';

const CreateAssignmentForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    instructions: '',
    deadline: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Assignment created:', data);
        alert('Assignment created successfully');
      })
      .catch((err) => {
        console.error('Error:', err);
        alert('Error creating assignment');
      });
  };

  return (
    <div>
      <h2>Create Assignment</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label><br />
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Instructions</label><br />
          <textarea
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Deadline</label><br />
          <input
            type="datetime-local"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Create Assignment</button>
      </form>
    </div>
  );
};

export default CreateAssignmentForm;