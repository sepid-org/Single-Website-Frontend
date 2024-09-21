import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import ProgramManagement from './pages/ProgramManagement';
import { DarkSecondary, PrimaryColor } from './constants/colors';
import SeatsGame from './pages/SeatsGame';
import LoginPage from './pages/Login';
import AnonymousRoute from 'commons/routes/AnonymousRoute';
import PrivateRoute from 'commons/routes/PrivateRoute';
import ResetPassword from './pages/ResetPassword';
import CreateAccount from './pages/CreateAccount';
import { ThemeProvider } from '@mui/material/styles';
import { customTheme } from './styles/Theme';

const App = () => {

  return (
    <div style={{
      backgroundColor: DarkSecondary,
      minHeight: '100vh',  // This ensures the color covers the full height of the viewport
    }}>
      <ThemeProvider theme={customTheme}>
        <Routes>

          <Route path="/" element={<PrivateRoute loginUrl='/program/filmbazi/login/' />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="seats-game" element={<SeatsGame />} />
            <Route path="admin-dashboard" element={<ProgramManagement />} />
          </Route>

          <Route path="/" element={<AnonymousRoute base='/program/filmbazi/' />}>
            <Route path="/login/" element={<LoginPage />} />
            <Route path="/create-account/" element={<CreateAccount />} />
            <Route path="/reset-password/" element={<ResetPassword />} />
          </Route>

        </Routes>
      </ThemeProvider>
    </div>
  );
};

export default App;