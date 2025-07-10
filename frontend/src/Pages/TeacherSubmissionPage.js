import React from 'react';
import { useParams } from 'react-router-dom';
import TeacherSubmissionList from '../Components/TeacherSubmissionList';

const TeacherSubmissionPage = () => {
  const { assignmentId } = useParams();

  return (
    <div
      style={{
        padding: '40px',
        maxWidth: '800px',
        margin: '40px auto',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 6px 16px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h2
        style={{
          textAlign: 'center',
          marginBottom: '30px',
          color: '#2c3e50',
          fontSize: '26px',
        }}
      >
        Submissions for Assignment
      </h2>

      <TeacherSubmissionList assignmentId={assignmentId} />
    </div>
  );
};

export default TeacherSubmissionPage;