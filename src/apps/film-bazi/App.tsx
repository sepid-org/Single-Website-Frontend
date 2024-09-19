import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import UserProfile from './pages/UserProfile';
import AdminProfile from './pages/AdminProfile';


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="user-profile" element={<UserProfile />} />
      <Route path="admin-profile" element={<AdminProfile />} />
    </Routes>
  );
};


export default App;
