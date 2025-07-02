import React from "react";
import "./Dashboard.css";

const classes = [
  {
    id: 1,
    title: "24-25 CSDC105.N1Am",
    section: "Mon-Sat 8-11am P217/CSLAB2",
    teacher: "ADNU Department of Computer...",
    badge: "/classroom.png",
    color: "#1976d2"
  },
];

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="class-grid">
        {classes.map((cls) => (
          <div className="class-card" key={cls.id} style={{ backgroundColor: cls.color }}>
            <div className="class-card-header">
              <div className="class-card-title">{cls.title}</div>
              <img src={cls.badge} alt="Class badge" className="class-card-badge" />
            </div>
            <div className="class-card-section">{cls.section}</div>
            <div className="class-card-teacher">{cls.teacher}</div>
            <div className="class-card-footer">
              <span className="class-card-department">{cls.department}</span>
              <div className="class-card-actions">
                <button className="class-card-action-btn" title="Open class">
                  <span role="img" aria-label="Open">📂</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;