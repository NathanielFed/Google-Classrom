import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Stream from './Components/Stream';
import CLassForm from './Components/ClassForm';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/classForm" element={<CLassForm />} />
      <Route path="/classForm" element={<Stream />} />
    </Routes>
  );
}

export default App;

