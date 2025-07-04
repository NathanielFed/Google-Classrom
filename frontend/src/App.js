import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

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
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/classForm" element={<CLassForm />} />
      <Route path="/stream" element={<Stream />} />
      <Route path="/gradingForm" element={<GradingForm />} />
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/login" element={<Login />} />
      <Route path="/createAssignmentForm" element={<CreateAssignmentForm />} />
     
      {/* Add more routes as needed */}
    </Routes>
    </BrowserRouter>
  );
}

export default App;

