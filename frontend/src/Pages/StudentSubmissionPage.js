import React from 'react';
import { useParams } from 'react-router-dom';
import StudentSubmissionForm from '../Components/StudentSubmissionForm';
import StudentSubmissionStatus from '../Components/StudentSubmissionStatus';

const StudentSubmissionPage = () => {
  const { assignmentId } = useParams();

  return (
    <div style={{
      padding: '40px',
      maxWidth: '600px',
      margin: '40px auto',
      backgroundColor: '#f4f4f4',
      borderRadius: '12px',
      boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h2 style={{
        textAlign: 'center',
        marginBottom: '30px',
        color: '#333',
        fontSize: '26px'
      }}>
        Assignment Submission
      </h2>

      <StudentSubmissionForm assignmentId={assignmentId} />
      <StudentSubmissionStatus assignmentId={assignmentId} />

    </div>
  );
};

export default StudentSubmissionPage;