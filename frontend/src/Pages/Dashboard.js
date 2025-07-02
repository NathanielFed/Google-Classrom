import React from "react";
import "./Dashboard.css";

// Example data; replace with real data as needed
const classes = [
  {
    id: 1,
    title: "2024-2 CIFP102.ZS11...",
    section: "MON 03:00PM-04:30PM P113",
    teacher: "Juan Carlos de los Reyes",
    department: "ADNU Department of Computer...",
    badge: "/classroom.png",
    color: "#388e3c"
  },
  {
    id: 2,
    title: "2024-2 CSMC223.N2...",
    section: "TTH 04:30PM-06:00PM P217/CSLAB2",
    teacher: "ADNU Department of Computer...",
    badge: "/classroom.png",
    color: "#1976d2"
  },
  // Add more class objects as needed
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