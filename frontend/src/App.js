import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import CLassForm from './Components/ClassForm';
import CreateAssignmentForm from './Components/CreateAssignmentForm';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/classForm" element={<CLassForm />} />
      <Route path="/createAssignmentForm" element={<CreateAssignmentForm />} />
    </Routes>
  );
}

export default App;

