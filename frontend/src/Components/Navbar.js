import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { FaBars, FaPlus, FaTh, FaUserCircle } from "react-icons/fa";
import ClassForm from "./ClassForm";
import JoinClass from "./JoinClass";

const Navbar = ({ onToggleSidebar, isSidebarCollapsed, userProfilePic, userRole }) => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("token");
  const [showJoinTooltip, setShowJoinTooltip] = useState(false);
  const [showClassModal, setShowClassModal] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handlePlusClick = () => {
    setShowClassModal(true);
  };

  const handleCloseModal = () => {
    setShowClassModal(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="navbar-hamburger" onClick={onToggleSidebar} aria-label="Toggle sidebar">
          <FaBars />
        </button>
        <Link to="/dashboard" className="navbar-logo-link">
          <img src="/classroom.png" alt="Google Classroom Logo" className="navbar-logo-img" style={{ height: 36, marginRight: 10 }} />
          <span className="navbar-logo-text" style={{ fontFamily: '"Google Sans", Roboto, Arial, sans-serif', fontWeight: 500, fontSize: '1.25rem' }}>Classroom</span>
        </Link>
      </div>
      <div className="navbar-right">
        <div className="navbar-icon-group">
          <div
            className="navbar-plus-wrapper"
            onMouseEnter={() => setShowJoinTooltip(true)}
            onMouseLeave={() => setShowJoinTooltip(false)}
          >
            <button className="navbar-icon-btn" aria-label="Join or Create class" onClick={handlePlusClick}>
              <FaPlus />
            </button>
            {showJoinTooltip && <span className="navbar-tooltip">{userRole === "teacher" ? "Create class" : "Join class"}</span>}
          </div>
          <button className="navbar-icon-btn" aria-label="Google apps">
            <FaTh className="navbar-waffle" />
          </button>
          {userProfilePic ? (
            <img
              src={userProfilePic}
              alt="Profile"
              className="navbar-profile-pic"
            />
          ) : (
            <FaUserCircle className="navbar-profile-pic" style={{ fontSize: 32, color: '#888' }} />
          )}
        </div>
        {isAuthenticated && (
          <button className="navbar-link navbar-logout-btn" onClick={handleLogout}>Logout</button>
        )}
      </div>
      {showClassModal && (
        userRole === "teacher"
          ? <ClassForm onClose={handleCloseModal} />
          : <JoinClass onClose={handleCloseModal} />
      )}
    </nav>
  );
};

export default Navbar;