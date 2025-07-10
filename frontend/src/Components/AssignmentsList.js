import React, { useEffect, useState } from 'react';

const AssignmentsList = ({ classroomId }) => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statuses, setStatuses] = useState({});

  useEffect(() => {
    if (!classroomId) return;

    const fetchAssignments = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/assignments/${classroomId}`);
        const data = await res.json();
        setAssignments(data);

        // Fetch submission status for each assignment
        const token = localStorage.getItem('token');
        const statusMap = {};

        for (const assignment of data) {
          try {
            const statusRes = await fetch(
              `http://localhost:5000/api/submissions/status/${assignment._id}`,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
            const statusData = await statusRes.json();
            statusMap[assignment._id] = statusData.status;
          } catch (err) {
            console.error('Status fetch failed for assignment', assignment._id);
            statusMap[assignment._id] = 'error';
          }
        }

        setStatuses(statusMap);
      } catch (err) {
        console.error('Failed to fetch assignments', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, [classroomId]);

  if (loading) return <p>Loading assignments...</p>;

  const getStatusLabel = (status) => {
    switch (status) {
      case 'submitted_on_time':
        return <span style={{ color: 'green' }}>✅ Submitted on time</span>;
      case 'submitted_late':
        return <span style={{ color: 'orange' }}>⚠️ Submitted late</span>;
      case 'pending':
        return <span style={{ color: 'red' }}>⏳ Pending</span>;
      default:
        return <span style={{ color: 'gray' }}>Unknown</span>;
    }
  };

  return (
    <div>
      <h2
        style={{
          fontSize: '26px',
          marginBottom: '20px',
          color: '#2c3e50',
          textAlign: 'center',
        }}
      >
        Assignments for Class: {classroomId}
      </h2>

      {assignments.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#888' }}>
          No active assignments yet.
        </p>
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
              <h3
                style={{
                  fontSize: '20px',
                  color: '#34495e',
                  marginBottom: '10px',
                }}
              >
                {assignment.title}
              </h3>
              <p
                style={{
                  fontSize: '14px',
                  color: '#555',
                  marginBottom: '5px',
                }}
              >
                <strong>Due:</strong>{' '}
                {new Date(assignment.deadline).toLocaleString()}
              </p>
              <p
                style={{
                  fontSize: '15px',
                  color: '#666',
                  marginBottom: '8px',
                }}
              >
                {assignment.instructions}
              </p>
              <p style={{ fontSize: '14px', fontStyle: 'italic' }}>
                Status: {getStatusLabel(statuses[assignment._id])}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AssignmentsList;