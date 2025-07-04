import './App.css';

import { Routes, Route, BrowserRouter } from 'react-router-dom';

import Login from './Pages/Login';
import Register from './Pages/Register';
import { TeacherDashboard, StudentDashboard } from './Pages/Dashboard';
import Stream from './Components/Stream';
import CLassForm from './Components/ClassForm';
import Navbar from './Components/Navbar';
import Sidebar from './Components/Sidebar';
import React, { useState } from 'react';
import GradingForm from './Components/GradingForm';

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const userProfilePic = null;

  // Placeholder for authentication state
  const isAuthenticated = false;

  // Placeholder for user role: 'teacher' or 'student'
  const userRole = 'student';  // replace with student to test student dashboard

  const handleToggleSidebar = () => {
    setSidebarCollapsed((prev) => !prev);
  };

  const showNavAndSidebar = window.location.pathname === '/dashboard';

  return (
    <div className={`app-main-layout${sidebarCollapsed ? ' sidebar-collapsed' : ''}`}>
      {showNavAndSidebar && (
        <>
          <Navbar onToggleSidebar={handleToggleSidebar} isSidebarCollapsed={sidebarCollapsed} userProfilePic={userProfilePic} />
          <div className="sidebar">
            <Sidebar collapsed={sidebarCollapsed} />
          </div>
        </>
      )}
      <main className={`main-content${sidebarCollapsed ? ' sidebar-collapsed' : ''}`}>
        <div className="content-wrapper">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={userRole === 'teacher' ? <TeacherDashboard /> : <StudentDashboard />} />
            <Route path="/classForm" element={<CLassForm />} />
            <Route path="/stream" element={<Stream />} />
            <Route path="/gradingForm" element={<GradingForm />} />
            
          </Routes>
        </div>
      </main>
    </div>
}

export default App;

