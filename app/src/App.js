// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login'; // Tu componente de login
import Dashboard from './components/Dashboard'; // Tu componente de dashboard

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
