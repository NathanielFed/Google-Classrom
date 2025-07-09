import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import Login from './Pages/Login';
import Register from './Pages/Register';
import CLassForm from './Components/ClassForm';
import GradingForm from './Components/GradingForm';
import StudentView from './Pages/StudentView';
import CreateAssignmentForm from './Components/CreateAssignmentForm';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/classForm" element={<CLassForm />} />
      <Route path="/GradingForm" element={
        <div className="grading-container">
          <GradingForm />
          <StudentView />
        </div>
      } />
      <Route path="/createAssignmentForm" element={<CreateAssignmentForm />} />
      <Route path="/GradingForm/:id" element={<GradingForm />} />
      <Route path="/student-view" element={<StudentView />} />
    </Routes>
  );
}

export default App;