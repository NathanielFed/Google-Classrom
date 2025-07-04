import React, { useState, useEffect } from "react";
import "./Dashboard.css";

const teacherClasses = [
  {
    id: 1,
    title: "CSDC105",
    section: "Section N1Am",
    students: 25,
    assignments: 3,
    color: "#4285F4"
  },
  {
    id: 2,
    title: "ITMC313",
    section: "Section N2Am",
    students: 18,
    assignments: 1,
    color: "#34A853"
  }
];

const studentClasses = [
  {
    id: 1,
    title: "CSDC105",
    section: "Section N1Am",
    teacher: "Prof. Agawa",
    assignmentsDue: 2,
    announcements: 1,
    color: "#4285F4"
  },
  {
    id: 2,
    title: "ITMC313",
    section: "Section N2Am",
    teacher: "Prof. Sereno",
    assignmentsDue: 0,
    announcements: 0,
    color: "#34A853"
  }
];

const TeacherDashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Classes</h1>
        <button className="create-class-btn">+ Create</button>
      </div>
      <div className="class-grid">
        {teacherClasses.map((cls) => (
          <div className="class-card" key={cls.id}>
            <div className="class-card-header" style={{ backgroundColor: cls.color }}>
              <div className="class-card-logo">{cls.title.charAt(0)}</div>
              <div>
                <div className="class-card-title">{cls.title}</div>
                <div className="class-card-section">{cls.section}</div>
              </div>
            </div>
            <div className="class-card-body">
              <div className="class-card-stats">
                <div>{cls.students} students</div>
                <div>{cls.assignments} active assignments</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const StudentDashboard = () => {
  const [assignmentsData, setAssignmentsData] = useState({});

  useEffect(() => {
    const fetchAssignments = async () => {
      const token = localStorage.getItem("token");
      const updatedData = {};

      for (const cls of studentClasses) {
        try {
          const res = await fetch(`http://localhost:4000/api/assignments/classroom/${cls.id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });

          const assignments = await res.json();
          const now = new Date();

          const activeAssignments = assignments.filter(
            (a) => new Date(a.deadline) > now
          );

          updatedData[cls.id] = activeAssignments.length;
        } catch (err) {
          console.error(`Error fetching assignments for class ${cls.title}:`, err);
          updatedData[cls.id] = 0;
        }
      }

      setAssignmentsData(updatedData);
    };

    fetchAssignments();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Classes</h1>
      </div>
      <div className="class-grid">
        {studentClasses.map((cls) => (
          <div className="class-card" key={cls.id}>
            <div
              className="class-card-header"
              style={{ backgroundColor: cls.color }}
            >
              <div className="class-card-logo">{cls.title.charAt(0)}</div>
              <div>
                <div className="class-card-title">{cls.title}</div>
                <div className="class-card-section">{cls.section}</div>
              </div>
            </div>
            <div className="class-card-body">
              <div className="class-card-teacher">{cls.teacher}</div>
              <div className="class-card-stats">
                <div>
                  {assignmentsData[cls.id] ?? "..."} assignments due
                </div>
                <div>0 new announcements</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { TeacherDashboard, StudentDashboard };