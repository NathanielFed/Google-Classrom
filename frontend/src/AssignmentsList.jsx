import React, { useEffect, useState } from "react";

const AssignmentsList = ({ classroomId }) => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!classroomId) return;
    setLoading(true);
    fetch(`http://localhost:5000/api/assignments/classroom/${classroomId}`)
      .then((res) => res.json())
      .then((data) => {
        setAssignments(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [classroomId]);

  if (!classroomId) {
    return <div>Please select a class to view assignments.</div>;
  }

  if (loading) return <div>Loading assignments...</div>;

  return (
    <div>
      <h3>Active Assignments</h3>
      {assignments.length === 0 ? (
        <p>No assignments found.</p>
      ) : (
        <ul>
          {assignments.map((a) => (
            <li key={a._id}>
              <strong>{a.title}</strong>
              <br />
              Due: {a.deadline ? new Date(a.deadline).toLocaleString() : "No deadline"}
              <br />
              {a.instructions}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AssignmentsList;