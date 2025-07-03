import './App.css';
import { Routes, Route } from 'react-router-dom';
import React from 'react';

import Login from './Pages/Login';
import Register from './Pages/Register';
import Dashboard from './Pages/Dashboard';
import Stream from './Components/Stream';
import CLassForm from './Components/ClassForm';
import Navbar from './Components/Navbar';
import Sidebar from './Components/Sidebar';
import React, { useState } from 'react';
import GradingForm from './Components/GradingForm';

import CreateAssignmentForm from './Components/CreateAssignmentForm';

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const userProfilePic = null;

  // Placeholder for authentication state
  const isAuthenticated = false;

  const handleToggleSidebar = () => {
    setSidebarCollapsed((prev) => !prev);
  };

  return (
     <div className={`app-layout${sidebarCollapsed ? ' sidebar-collapsed' : ''}`}>
      {isAuthenticated && (
        <>
          <Navbar onToggleSidebar={handleToggleSidebar} isSidebarCollapsed={sidebarCollapsed} userProfilePic={userProfilePic} />
          <Sidebar collapsed={sidebarCollapsed} />
        </>
      )}
      <main className="main-content">
        <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/classForm" element={<CLassForm />} />
      <Route path="/stream" element={<Stream />} />
      <Route path="/gradingForm" element={<GradingForm />} />
      <Route path="/createAssignmentForm" element={<CreateAssignmentForm />} />

    </Routes>
      </main>
    </div>
  );
}

export default App;

