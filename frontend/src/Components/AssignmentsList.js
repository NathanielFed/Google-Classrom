import React, { useEffect, useState } from 'react';

const AssignmentsList = ({ classroomId }) => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!classroomId) return;

    const fetchAssignments = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/assignments/${classroomId}`);
        const data = await res.json();
        setAssignments(data);
      } catch (err) {
        console.error('Failed to fetch assignments', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, [classroomId]);

  if (loading) return <p>Loading assignments...</p>;

  return (
    <div>
      <h2 style={{
        fontSize: '26px',
        marginBottom: '20px',
        color: '#2c3e50',
        textAlign: 'center'
      }}>
        Assignments for Class: {classroomId}
      </h2>

      {assignments.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#888' }}>No active assignments yet.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {assignments.map((assignment) => (
            <li
              key={assignment._id}
              style={{
                backgroundColor: '#fff',
                borderRadius: '10px',
                padding: '20px',
                marginBottom: '20px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                transition: '0.2s ease-in-out',
              }}
            >
              <h3 style={{ fontSize: '20px', color: '#34495e', marginBottom: '10px' }}>
                {assignment.title}
              </h3>
              <p style={{ fontSize: '14px', color: '#555', marginBottom: '5px' }}>
                <strong>Due:</strong> {new Date(assignment.deadline).toLocaleString()}
              </p>
              <p style={{ fontSize: '15px', color: '#666' }}>
                {assignment.instructions}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AssignmentsList;
