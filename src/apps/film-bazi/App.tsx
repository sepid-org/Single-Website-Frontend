import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import UserProfile from './pages/UserProfile';
import ProgramManagement from './pages/ProgramManagement';
import ScoreBoard from './pages/ScoreBoard';
import { COLOR1 } from './constants';

const App = () => {
  return (
    <div style={{
      backgroundColor: COLOR1,
      minHeight: '100vh',  // This ensures the color covers the full height of the viewport
    }}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="user-profile" element={<UserProfile />} />
        <Route path="admin-dashboard" element={<ProgramManagement />} />
        <Route path="scoreboard" element={<ScoreBoard />} />
      </Routes>
    </div>
  );
};

export default App;