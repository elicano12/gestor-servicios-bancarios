import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login'; 
import Dashboard from './pages/Dashboard';
import DashboardUsers from './pages/DashboardUsers';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/users" element={<DashboardUsers />} />
    </Routes>
  );
}

export default App;
