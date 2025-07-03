import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import React, { useState } from 'react';

import Login from './Pages/Login';
import Register from './Pages/Register';
import Stream from './Components/Stream';
import CLassForm from './Components/ClassForm';
import Navbar from './Components/Navbar';
import Sidebar from './Components/Sidebar';
import Dashboard from './Pages/Dashboard';
import GradingForm from './Components/GradingForm';
import CreateAssignmentForm from './Components/CreateAssignmentForm';

function App() {
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