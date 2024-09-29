import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import StudentDashboard from './components/CompanyDashboard';
import CompanyDashboard from './components/StudentDashboard';
import Admin from './pages/Admin';
import Student from './pages/Student';
import Company from './pages/Company';



function App() {
  return (
    <Router>
      <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/admin-dashboard" element={<AdminDashboard />} />
    <Route path="/students/dashboard" element={<StudentDashboard />} />
    <Route path="/companies/dashboard" element={<CompanyDashboard />} />
    <Route path="/admin" element={<Admin />} />
    <Route path="/student" element={<Student />} />
    <Route path="/company" element={<Company />} />
      </Routes>
    </Router>
  );
}

export default App;
