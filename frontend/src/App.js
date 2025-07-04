import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import React from 'react';

import Login from './Pages/Login';
import Register from './Pages/Register';
import Stream from './Components/Stream';
import CLassForm from './Components/ClassForm';
import GradingForm from './Components/GradingForm';

import CreateAssignmentForm from './Components/CreateAssignmentForm';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/classForm" element={<CLassForm />} />
      <Route path="/stream" element={<Stream />} />
      <Route path="/GradingForm" element={<GradingForm />} />
      <Route path="/createAssignmentForm" element={<CreateAssignmentForm />} />

    </Routes>
    </BrowserRouter>
  );
}

export default App;

