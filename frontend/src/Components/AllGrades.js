import React, { useEffect, useState } from 'react';

const AllGrades = () => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    fetch('/api/assignments')
      .then(res => res.json())
      .then(data => setAssignments(data));
  }, []);

  return (
    <div>
      <h2>All Grades</h2>
      <table>
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Grade</th>
            <th>Comment</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map(a => (
            <tr key={a._id}>
              <td>{a.studentName}</td>
              <td>{a.grade !== undefined ? a.grade : 'Not graded'}</td>
              <td>{a.comment || ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllGrades;