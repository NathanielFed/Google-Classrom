import React, { useEffect, useState } from 'react';

const StudentSubmissionStatus = ({ assignmentId }) => {
  const [status, setStatus] = useState('');
  const [submittedAt, setSubmittedAt] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token || !assignmentId) return;

    const fetchStatus = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/submissions/status/${assignmentId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (res.ok) {
          setStatus(data.status);
          setSubmittedAt(data.submittedAt);
        } else {
          console.error(data.error);
        }
      } catch (err) {
        console.error('Error fetching status:', err);
      }
    };

    fetchStatus();
  }, [assignmentId]);

  const formatStatus = (status) => {
    switch (status) {
      case 'submitted_on_time': return '✅ Submitted on time';
      case 'submitted_late': return '⚠️ Submitted late';
      case 'pending': return '❌ Not submitted';
      default: return '';
    }
  };

  return (
    <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '16px' }}>
      <strong>Status:</strong> {formatStatus(status)}
      {submittedAt && <div>Submitted at: {new Date(submittedAt).toLocaleString()}</div>}
    </div>
  );
};

export default StudentSubmissionStatus;