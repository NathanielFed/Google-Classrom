import React, { useState, useEffect } from 'react';
import '../Components/GradingForm.css'; // ✅ fix import

const StudentView = () => {
  const [assignments, setAssignments] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [studentAssignment, setStudentAssignment] = useState(null);

  useEffect(() => {
    // demo data to display
    const demoAssignments = [
      {
        _id: '1',
        studentName: 'Nathan',
        submissions: [
          { submissionPreview: "Nathan's work", grade: 85, comment: "Well done!" }
        ]
      },
      {
        _id: '2',
        studentName: 'Clyde',
        submissions: [
          { submissionPreview: "Clyde's essay", grade: 75, comment: "Needs improvement." }
        ]
      }
    ];
    setAssignments(demoAssignments);
  }, []);

  useEffect(() => {
    const found = assignments.find(a => a._id === selectedStudentId);
    setStudentAssignment(found || null);
  }, [selectedStudentId, assignments]);

  return (
    <div className="grading-container">
      <div className="assignment-panel">
        <h2>View Your Grades</h2>
        <label>Select Your Name:</label>
        <select
          value={selectedStudentId}
          onChange={e => setSelectedStudentId(e.target.value)}
        >
          <option value="">-- Select --</option>
          {assignments.map(a => (
            <option key={a._id} value={a._id}>{a.studentName}</option>
          ))}
        </select>

        {studentAssignment && studentAssignment.submissions.length > 0 && (
          <div style={{ marginTop: '1rem' }}>
            <h3>Your Submissions & Grades</h3>
            <table>
              <thead>
                <tr>
                  <th>Submission</th>
                  <th>Grade</th>
                  <th>Comment</th>
                </tr>
              </thead>
              <tbody>
                {studentAssignment.submissions.map((s, idx) => (
                  <tr key={idx}>
                    <td>{s.submissionPreview}</td>
                    <td>{s.grade ?? 'Not graded'}</td>
                    <td>{s.comment ?? ''}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {studentAssignment && studentAssignment.submissions.length === 0 && (
          <p style={{ marginTop: '1rem' }}>You don't have any submissions yet.</p>
        )}
      </div>
    </div>
  );
};

export default StudentView;
