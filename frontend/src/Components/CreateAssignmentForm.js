import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const CreateAssignmentForm = () => {
  const { classId } = useParams();

  const [formData, setFormData] = useState({
    title: '',
    instructions: '',
    deadline: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    console.log("📦 Sending token:", token);

    fetch('http://localhost:5000/api/assignments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...formData,
        classroomId: classId,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to create assignment');
        return res.json();
      })
      .then(() => {
        alert('✅ Assignment created successfully');
        setFormData({ title: '', instructions: '', deadline: '' });
      })
      .catch((err) => {
        console.error('❌ Error creating assignment:', err);
        alert('❌ Error creating assignment');
      });
  };

  return (
    <div style={{
      maxWidth: '600px',
      margin: '40px auto',
      padding: '30px',
      backgroundColor: '#f9f9f9',
      borderRadius: '12px',
      boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
    }}>
      <h2 style={{
        textAlign: 'center',
        marginBottom: '25px',
        fontSize: '28px',
        color: '#333',
      }}>
        Create Assignment
      </h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Assignment Title"
          style={{
            width: '100%',
            padding: '12px',
            marginBottom: '20px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            fontSize: '16px',
          }}
          required
        />
        <textarea
          name="instructions"
          value={formData.instructions}
          onChange={handleChange}
          placeholder="Instructions"
          style={{
            width: '100%',
            padding: '12px',
            height: '120px',
            marginBottom: '20px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            fontSize: '16px',
            resize: 'vertical',
          }}
          required
        />
        <input
          type="datetime-local"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '12px',
            marginBottom: '20px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            fontSize: '16px',
          }}
          required
        />
        <button
          type="submit"
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            backgroundColor: '#4CAF50',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            width: '100%',
          }}
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateAssignmentForm;