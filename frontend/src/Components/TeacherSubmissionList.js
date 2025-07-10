import React, { useEffect, useState } from 'react';

const TeacherSubmissionList = ({ assignmentId }) => {
  const [subs, setSubs] = useState([]);

  useEffect(() => {
    const fetchSubs = async () => {
      const token = localStorage.getItem('token');
      const res = await fetch(
        `http://localhost:5000/api/submissions/assignment/${assignmentId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const d = await res.json();
      setSubs(d);
    };
    fetchSubs();
  }, [assignmentId]);

  return (
    <div
      style={{
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '12px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        maxWidth: '800px',
        margin: '30px auto',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h3
        style={{
          fontSize: '24px',
          marginBottom: '20px',
          textAlign: 'center',
          color: '#2c3e50',
        }}
      >
        Student Submissions
      </h3>

      {subs.length === 0 ? (
        <p
          style={{
            textAlign: 'center',
            color: '#888',
            fontSize: '16px',
          }}
        >
          No one has submitted yet.
        </p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {subs.map((s) => (
            <li
              key={s._id}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '10px',
                padding: '16px',
                marginBottom: '15px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
              }}
            >
              <p style={{ margin: 0, fontSize: '16px', fontWeight: 'bold', color: '#34495e' }}>
                {s.studentId.name} ({s.studentId.email})
              </p>
              <p style={{ margin: '5px 0', fontSize: '14px', color: '#555' }}>
                Submitted at: {new Date(s.submittedAt).toLocaleString()}
              </p>
              <p style={{ margin: '5px 0', fontSize: '15px', color: '#444' }}>
                <strong>Message:</strong> {s.message || <i>No message</i>}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TeacherSubmissionList;