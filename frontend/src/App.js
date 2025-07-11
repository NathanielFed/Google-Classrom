import './App.css';
import React, { useState } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import { TeacherDashboard, StudentDashboard } from './Pages/Dashboard';
import Stream from './Components/Stream';
import CLassForm from './Components/ClassForm';
import GradingForm from './Components/GradingForm';
import JoinClass from './Components/JoinClass';
import CreateAssignmentForm from './Components/CreateAssignmentForm';
import StudentSubmissionPage from './Pages/StudentSubmissionPage';
import AssignmentsListPage from './Pages/AssignmentsListPage';
import TeacherSubmissionPage from './Pages/TeacherSubmissionPage';


function StreamWithParams() {
  const { classId } = useParams();
  return <Stream classId={classId} />;
}

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const userProfilePic = null;
  const userRole = 'teacher';
  const handleToggleSidebar = () => {
    setSidebarCollapsed((prev) => !prev);
  };
  return (
    <div className={`app-main-layout${sidebarCollapsed ? ' sidebar-collapsed' : ''}`}>
      <main className={`main-content${sidebarCollapsed ? ' sidebar-collapsed' : ''}`}>
        <div className="content-wrapper">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={userRole === 'teacher' ? <TeacherDashboard sidebarCollapsed={sidebarCollapsed} onToggleSidebar={handleToggleSidebar} userProfilePic={userProfilePic} userRole={userRole} /> : <StudentDashboard sidebarCollapsed={sidebarCollapsed} onToggleSidebar={handleToggleSidebar} userProfilePic={userProfilePic} userRole={userRole} />}
            />
            <Route path="/classForm" element={<CLassForm />} />
            <Route path="/stream" element={<Stream />} />
            <Route path="/gradingForm" element={<GradingForm />} />
            <Route path="/joinClass" element={<JoinClass />} />
            <Route path="/createAssignmentForm" element={<CreateAssignmentForm />} />
            <Route path="/assignments" element={<AssignmentsListPage />} />
            <Route path="/assignments/:assignmentId/submissions" element={<StudentSubmissionPage />} />
            <Route path="/stream/:classId" element={<StreamWithParams />} />
            <Route path="/stream/:classId/create-assignment" element={<CreateAssignmentForm />}/>
            <Route path="/stream/:classId/assignments/:assignmentId/submissions" element={<StudentSubmissionPage />} />
             <Route path="/stream/:classId/assignments" element={<AssignmentsListPage />} />
            <Route path="/stream/:classId/assignments/:assignmentId/submissions" element={<StudentSubmissionPage />} />
            <Route path="/assignments/:assignmentId/view-submissions" element={<TeacherSubmissionPage />} />
            <Route path="*" element={<div>Page Not Found</div>} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;