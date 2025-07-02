import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Stream from './Components/Stream';
import CLassForm from './Components/ClassForm';
import Navbar from './Components/Navbar';
import Sidebar from './Components/Sidebar';
import React, { useState } from 'react';

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const userProfilePic = null;

  const handleToggleSidebar = () => {
    setSidebarCollapsed((prev) => !prev);
  };

  return (
    <div className={`app-layout${sidebarCollapsed ? ' sidebar-collapsed' : ''}`}>
      <Navbar onToggleSidebar={handleToggleSidebar} isSidebarCollapsed={sidebarCollapsed} userProfilePic={userProfilePic} />
      <Sidebar collapsed={sidebarCollapsed} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/classForm" element={<CLassForm />} />
          <Route path="/stream" element={<Stream />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

