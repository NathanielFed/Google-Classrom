import React, { useState } from 'react';

const CreateAssignmentForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    instructions: '',
    deadline: '',
    classroomId: '',
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

    fetch('http://localhost:5000/api/assignments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to create assignment');
        return res.json();
      })
      .then((data) => {
        console.log('Assignment created:', data);
        alert('Assignment created successfully');
        setFormData({
          title: '',
          instructions: '',
          deadline: '',
          classroomId: '',
        });
      })
      .catch((err) => {
        console.error('Error:', err);
        alert('Error creating assignment');
      });
  };

  const containerStyle = {
    maxWidth: '500px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  };

  const labelStyle = {
    fontWeight: 'bold',
    marginBottom: '5px',
    display: 'block',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  };

  const buttonStyle = {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  const textareaStyle = {
    ...inputStyle,
    height: '100px',
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: 'center' }}>Create Assignment</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label style={labelStyle}>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </div>
        <div>
          <label style={labelStyle}>Instructions</label>
          <textarea
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            style={textareaStyle}
            required
          />
        </div>
        <div>
          <label style={labelStyle}>Deadline</label>
          <input
            type="datetime-local"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </div>
        <div>
          <label style={labelStyle}>Classroom ID</label>
          <input
            type="text"
            name="classroomId"
            value={formData.classroomId}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </div>
        <button type="submit" style={buttonStyle}>Create Assignment</button>
      </form>
    </div>
  );
};

export default CreateAssignmentForm;