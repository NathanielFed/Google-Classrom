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
      <h2>Assignments</h2>
      {assignments.length === 0 ? (
        <p>No assignments yet.</p>
      ) : (
        <ul>
          {assignments.map((assignment) => (
            <li key={assignment._id}>
              <strong>{assignment.title}</strong> – due {new Date(assignment.deadline).toLocaleString()}
              <p>{assignment.instructions}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AssignmentsList;
