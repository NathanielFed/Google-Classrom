import React, { useState } from 'react';
import './GradingForm.css';

const demoAssignments = [
  { _id: '1', studentName: 'Nathan', submissionPreview: "Nathan's work", grades: [] },
  { _id: '2', studentName: 'Clyde', submissionPreview: "Clyde's work", grades: [] },
  { _id: '3', studentName: 'Eric', submissionPreview: "Eric's work", grades: [] }
];

const GradingForm = () => {
  const [assignments, setAssignments] = useState(demoAssignments);
  const [selectedId, setSelectedId] = useState('');
  const [assignment, setAssignment] = useState(null);
  const [grade, setGrade] = useState('');
  const [comment, setComment] = useState('');
  const [editIndex, setEditIndex] = useState(null); 
  React.useEffect(() => {
    const found = assignments.find(a => a._id === selectedId);
    setAssignment(found || null);
    setGrade('');
    setComment('');
    setEditIndex(null);
  }, [selectedId, assignments]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!assignment) return;

    const newGradeObj = { grade, comment, date: new Date().toLocaleString() };

    let updatedGrades;
    if (editIndex !== null) {
  
      updatedGrades = [...assignment.grades];
      updatedGrades[editIndex] = newGradeObj;
    } else {

      updatedGrades = [...(assignment.grades || []), newGradeObj];
    }

    const updatedAssignments = assignments.map(a =>
      a._id === assignment._id ? { ...a, grades: updatedGrades } : a
    );

    setAssignments(updatedAssignments);
    setAssignment({ ...assignment, grades: updatedGrades });
    setGrade('');
    setComment('');
    setEditIndex(null);
  };

  const handleEdit = (index) => {
    if (!assignment || !assignment.grades[index]) return;
    setGrade(assignment.grades[index].grade);
    setComment(assignment.grades[index].comment);
    setEditIndex(index);
  };

  return (
    <div className="grading-container">
      <div className="assignment-panel">
        <h2>Student Assignment</h2>
        <div>
          <label>Select Student: </label>
          <select
            value={selectedId}
            onChange={e => setSelectedId(e.target.value)}
          >
            <option value="">-- Select --</option>
            {assignments.map(a => (
              <option key={a._id} value={a._id}>
                {a.studentName}
              </option>
            ))}
          </select>
        </div>
        {assignment && (
          <div className="assignment-preview">
            <p><strong>Student Name:</strong> {assignment.studentName}</p>
            <div className="assignment-box">
              <p>{assignment.submissionPreview || 'No preview available.'}</p>
            </div>
            <div>
              <strong>Current Grade:</strong>{' '}
              {assignment.grades && assignment.grades.length > 0
                ? assignment.grades[assignment.grades.length - 1].grade
                : 'Not graded'}
              <br />
              <strong>Current Comment:</strong>{' '}
              {assignment.grades && assignment.grades.length > 0
                ? assignment.grades[assignment.grades.length - 1].comment
                : 'No comment'}
            </div>
          </div>
        )}
      </div>

      <div className="grading-panel">
        <form onSubmit={handleSubmit}>
          <label htmlFor="grade">Grade (out of 100)</label>
          <input
            type="number"
            id="grade"
            value={grade}
            onChange={e => {
              const val = e.target.value;
              if (val === '' || (Number(val) >= 0 && Number(val) <= 100)) {
                setGrade(val);
              }
            }}
            placeholder="e.g., 85"
            min="0"
            max="100"
            required
            inputMode="numeric"
            pattern="[0-9]*"
            disabled={!assignment}
          />

          <label htmlFor="comment">Private Comment</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write a comment for the student..."
            disabled={!assignment}
          ></textarea>

          <button type="submit" disabled={!assignment}>
            {editIndex !== null ? 'Update Grade' : 'Return'}
          </button>
        </form>
      </div>

      {assignment && assignment.grades && assignment.grades.length > 0 && (
        <div className="grading-panel">
          <h3>All Grades: </h3>
          {assignment.grades.map((g, idx) => (
            <div key={idx} style={{ marginBottom: '0.5rem' }}>
              <strong>Task {idx + 1}:</strong> Grade: {g.grade}, Comment: {g.comment}
              <button
                style={{ marginLeft: '1rem', fontSize: '0.8rem', padding: '2px 6px' }}
                onClick={() => handleEdit(idx)}
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="all-grades-panel" style={{ marginTop: '2rem' }}>
        <h3>All Students' Grades</h3>
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
                <td>
                  {a.grades && a.grades.length > 0
                    ? a.grades.map((g, idx) => (
                        <div key={idx}>
                          <strong>Task {idx + 1}:</strong> {g.grade}
                        </div>
                      ))
                    : 'Not graded'}
                </td>
                <td>
                  {a.grades && a.grades.length > 0
                    ? a.grades.map((g, idx) => (
                        <div key={idx}>
                          <strong>Task {idx + 1}:</strong> {g.comment}
                        </div>
                      ))
                    : ''}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GradingForm;
