import './App.css';
import React, { useState } from 'react';
import { Routes, Route, BrowserRouter, useParams } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import { TeacherDashboard, StudentDashboard } from './Pages/Dashboard';
import Stream from './Components/Stream';
import CLassForm from './Components/ClassForm';
import Navbar from './Components/Navbar';
import Sidebar from './Components/Sidebar';
import GradingForm from './Components/GradingForm';
import JoinClass from './Components/JoinClass';
import CreateAssignmentForm from './Components/CreateAssignmentForm';
import StudentSubmissionPage from './Pages/StudentSubmissionPage';
import AssignmentsListPage from './Pages/AssignmentsListPage';

function StreamWithParams() {
  const { classId } = useParams();
  return <Stream classId={classId} />;
}

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const userProfilePic = null;

  const isAuthenticated = false;
  const userRole = 'teacher';

  const handleToggleSidebar = () => {
    setSidebarCollapsed((prev) => !prev);
  };

  const showNavAndSidebar = window.location.pathname.startsWith('/dashboard');

  return (
      <div className={`app-main-layout${sidebarCollapsed ? ' sidebar-collapsed' : ''}`}>
        {showNavAndSidebar && (
          <>
            <Navbar
              onToggleSidebar={handleToggleSidebar}
              isSidebarCollapsed={sidebarCollapsed}
              userProfilePic={userProfilePic}
              userRole={userRole}
            />
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
              <Route
                path="/dashboard"
                element={userRole === 'student' ? <TeacherDashboard /> : <StudentDashboard />}
              />
              <Route path="/classForm" element={<CLassForm />} />
              <Route path="/stream" element={<Stream />} />
              <Route path="/gradingForm" element={<GradingForm />} />
              <Route path="/joinClass" element={<JoinClass />} />
              <Route path="/createAssignmentForm" element={<CreateAssignmentForm />} />
            </Routes>
          </div>
        </main>
      </div>
  );
}

export default App;