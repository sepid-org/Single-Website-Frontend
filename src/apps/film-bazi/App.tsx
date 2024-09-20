import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import ProgramManagement from './pages/ProgramManagement';
import { COLOR1 } from './constants';
import SeatsGame from './pages/SeatsGame';

const App = () => {
  return (
    <div style={{
      backgroundColor: COLOR1,
      minHeight: '100vh',  // This ensures the color covers the full height of the viewport
    }}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="seats-game" element={<SeatsGame />} />
        <Route path="admin-dashboard" element={<ProgramManagement />} />
      </Routes>
    </div>
  );
};

export default App;