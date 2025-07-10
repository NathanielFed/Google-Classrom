import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import ClassForm from "../Components/ClassForm";
import JoinClass from "../Components/JoinClass";
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Sidebar from '../Components/Sidebar';

export function TeacherDashboard({ sidebarCollapsed, onToggleSidebar, userProfilePic, userRole }) {
  const navigate = useNavigate();
  const [showClassForm, setShowClassForm] = useState(false);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClasses = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/classes/class-list", {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error("Failed to fetch classes");
        const data = await res.json();
        setClasses(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchClasses();
  }, []);

  return (
    <div className={`app-main-layout${sidebarCollapsed ? ' sidebar-collapsed' : ''}`}>
      <Navbar
        onToggleSidebar={onToggleSidebar}
        isSidebarCollapsed={sidebarCollapsed}
        userProfilePic={userProfilePic}
        userRole={userRole}
      />
      <div className="sidebar">
        <Sidebar collapsed={sidebarCollapsed} />
      </div>
      <main className={`main-content${sidebarCollapsed ? ' sidebar-collapsed' : ''}`}>
        <div className="dashboard-container">
          <div className="dashboard-header">
            <h1>Classes</h1>
          </div>
          {showClassForm && <ClassForm onClose={() => setShowClassForm(false)} />}
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error: {error}</div>
          ) : (
            <div className="class-grid">
              {classes.map((cls) => (
                <div
                  className="class-card"
                  key={cls.id || cls._id}
                  onClick={() => navigate(`/class/${cls.id || cls._id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="class-card-header" style={{ backgroundColor: cls.color || cls.bannerColor || "#4285F4" }}>
                    <div className="class-card-logo">{cls.title ? cls.title.charAt(0) : (cls.className ? cls.className.charAt(0) : "C")}</div>
                    <div>
                      <div className="class-card-title">{cls.title || cls.className}</div>
                      <div className="class-card-section">{cls.section}</div>
                    </div>
                  </div>
                  <div className="class-card-body">
                    <div className="class-card-stats">
                      <div>{cls.students || 0} students</div>
                      <div>{cls.assignments || 0} active assignments</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export function StudentDashboard({ sidebarCollapsed, onToggleSidebar, userProfilePic, userRole }) {
  const [classes, setClasses] = useState([]);
  const [assignmentsData, setAssignmentsData] = useState({});
  const [showJoinClass, setShowJoinClass] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const email = localStorage.getItem("email");
    fetch(`http://localhost:5000/api/classes/class-list?email=${encodeURIComponent(email)}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          const formatted = data.data.map(cls => ({
            id: cls._id,
            title: cls.className,
            section: cls.section || "",
            teacher: cls.teacherEmail,
            color: getRandomColor(),
          }));
          setClasses(formatted);
        } else {
          setError("Failed to fetch class list");
        }
      })
      .catch(err => {
        setError("Error fetching class list");
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const fetchAssignments = async () => {
      const token = localStorage.getItem("token");
      const updatedData = {};
      for (const cls of classes) {
        try {
          const res = await fetch(`http://localhost:4000/api/assignments/classroom/${cls.id || cls._id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          const assignments = await res.json();
          const now = new Date();
          const activeAssignments = assignments.filter((a) => new Date(a.deadline) > now);
          updatedData[cls.id || cls._id] = activeAssignments.length;
        } catch (err) {
          updatedData[cls.id || cls._id] = 0;
        }
      }
      setAssignmentsData(updatedData);
    };
    if (classes.length > 0) fetchAssignments();
  }, [classes]);

  const getRandomColor = () => {
    const colors = ["#4285F4", "#EA4335", "#FBBC05", "#34A853"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className={`app-main-layout${sidebarCollapsed ? ' sidebar-collapsed' : ''}`}>
      <Navbar
        onToggleSidebar={onToggleSidebar}
        isSidebarCollapsed={sidebarCollapsed}
        userProfilePic={userProfilePic}
        userRole={userRole}
      />
      <div className="sidebar">
        <Sidebar collapsed={sidebarCollapsed} />
      </div>
      <main className={`main-content${sidebarCollapsed ? ' sidebar-collapsed' : ''}`}>
        <div className="dashboard-container">
          <div className="dashboard-header">
            <h1>Classes</h1>
          </div>
          {showJoinClass && <JoinClass onClose={() => setShowJoinClass(false)} />}
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error: {error}</div>
          ) : (
            <div className="class-grid">
              {classes.map((cls) => (
                <div className="class-card" key={cls.id || cls._id}>
                  <div className="class-card-header" style={{ backgroundColor: cls.color || cls.bannerColor || "#4285F4" }}>
                    <div className="class-card-logo">{cls.title ? cls.title.charAt(0) : (cls.className ? cls.className.charAt(0) : "C")}</div>
                    <div>
                      <div className="class-card-title">{cls.title || cls.className}</div>
                      <div className="class-card-section">{cls.section}</div>
                    </div>
                  </div>
                  <div className="class-card-body">
                    <div className="class-card-teacher">{cls.teacher || cls.teacherID || ""}</div>
                    <div className="class-card-stats">
                      <div>{assignmentsData[cls.id || cls._id] ?? "..."} assignments due</div>
                      <div>{cls.announcements || 0} new announcements</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
