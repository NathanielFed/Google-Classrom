import './App.css';
import { Routes, Route } from 'react-router-dom';
import React from 'react';

import Login from './Pages/Login';
import Register from './Pages/Register';
import CLassForm from './Components/ClassForm';
import GradingForm from './Components/GradingForm';

import CreateAssignmentForm from './Components/CreateAssignmentForm';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/classForm" element={<CLassForm />} />
      <Route path="/GradingForm" element={<GradingForm />} />
      <Route path="/createAssignmentForm" element={<CreateAssignmentForm />} />
      <Route path="/GradingForm/:id" element={<GradingForm />} />

    </Routes>
  );
}

export default App;

