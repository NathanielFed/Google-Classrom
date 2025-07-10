import React from 'react';
import { useParams } from 'react-router-dom';
import AssignmentsList from '../Components/AssignmentsList';

const teacherClasses = [
  {
    id: '1',
    title: 'CSDC105',
    section: 'Section N1Am',
    students: 25,
    assignments: 3,
    color: '#4285F4'
  },
  {
    id: '2',
    title: 'ITMC313',
    section: 'Section N2Am',
    students: 18,
    assignments: 1,
    color: '#34A853'
  }
];

const AssignmentsListPage = () => {
  const { classroomId } = useParams(); // must match route param
  const classData = teacherClasses.find(c => c.id === classroomId);

  return (
    <div style={{
      padding: '30px',
      maxWidth: '800px',
      margin: '0 auto',
      backgroundColor: '#f9f9f9',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
    }}>
      <h2 style={{ marginBottom: '20px', color: '#333', fontSize: '28px', textAlign: 'center' }}>
        {classData ? `Assignments for ${classData.title} - ${classData.section}` : 'Class not found'}
      </h2>

      {classData && <AssignmentsList classroomId={classData.id} />}
    </div>
  );
};

export default AssignmentsListPage;