import React from "react";
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
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Classes</h1>
      </div>
      <div className="class-grid">
        {studentClasses.map((cls) => (
          <div className="class-card" key={cls.id}>
            <div className="class-card-header" style={{ backgroundColor: cls.color }}>
              <div className="class-card-logo">{cls.title.charAt(0)}</div>
              <div>
                <div className="class-card-title">{cls.title}</div>
                <div className="class-card-section">{cls.section}</div>
              </div>
            </div>
            <div className="class-card-body">
              <div className="class-card-teacher">{cls.teacher}</div>
              <div className="class-card-stats">
                <div>{cls.assignmentsDue} assignments due</div>
                <div>{cls.announcements} new announcements</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { TeacherDashboard, StudentDashboard };