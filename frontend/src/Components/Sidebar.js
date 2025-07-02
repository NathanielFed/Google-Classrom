import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import { FaHome, FaCalendarAlt, FaGraduationCap, FaArchive, FaCog } from "react-icons/fa";

const Sidebar = ({ collapsed }) => {
  return (
    <aside className={`sidebar${collapsed ? ' sidebar-collapsed' : ''}`}>
      <div className="sidebar-logo-container">
        <img src="/classroom.png" alt="Google Classroom Logo" className="sidebar-logo" />
      </div>
      <nav className="sidebar-nav">
        <Link to="/dashboard" className="sidebar-btn active">
          <FaHome className="sidebar-icon" />
          {!collapsed && <span>Home</span>}
        </Link>
        <Link to="/calendar" className="sidebar-btn">
          <FaCalendarAlt className="sidebar-icon" />
          {!collapsed && <span>Calendar</span>}
        </Link>
        <div className="sidebar-group">
          <Link to="/enrolled" className="sidebar-btn sidebar-btn-group">
            <FaGraduationCap className="sidebar-icon" />
            {!collapsed && <span>Enrolled</span>}
            {!collapsed && <span className="sidebar-arrow">&#8964;</span>}
          </Link>
        </div>
        <Link to="/archived" className="sidebar-btn">
          <FaArchive className="sidebar-icon" />
          {!collapsed && <span>Archived classes</span>}
        </Link>
        <Link to="/settings" className="sidebar-btn">
          <FaCog className="sidebar-icon" />
          {!collapsed && <span>Settings</span>}
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
