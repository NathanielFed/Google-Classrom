import React, { useEffect, useState } from 'react';

const AssignmentsList = ({ classroomId }) => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!classroomId) return;

    fetch(`http://localhost:5000/api/assignments/classroom/${classroomId}`)
      .then(res => res.json())
      .then(data => {
        setAssignments(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading assignments:', err);
        setLoading(false);
      });
  }, [classroomId]);

  if (loading) return <p>Loading assignments...</p>;
  if (assignments.length === 0) return <p>No assignments available.</p>;

  return (
    <div>
      <h3>Assignments</h3>
      <ul>
        {assignments.map((a) => (
          <li key={a._id}>
            <strong>{a.title}</strong> — Due: {new Date(a.deadline).toLocaleString()}
            <p>{a.instructions}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AssignmentsList;