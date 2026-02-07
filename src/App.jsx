import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Doctors from './pages/Doctors';
import Map from './pages/Map';
import Alerts from './pages/Alerts';
import Profile from './pages/Profile';
import Medicine from './pages/Medicine';
import LabTests from './pages/LabTests';
import Appointments from './pages/Appointments';
import HealthTips from './pages/HealthTips';
import Services from './pages/Services';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes (Mock) */}
        <Route element={<MainLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/map" element={<Map />} />
          <Route path="/medicine" element={<Medicine />} />
          <Route path="/lab-tests" element={<LabTests />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/health-tips" element={<HealthTips />} />
          <Route path="/services" element={<Services />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
