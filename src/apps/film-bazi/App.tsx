import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import ProgramManagement from './pages/ProgramManagement';
import { DarkSecondary } from './constants/colors';
import CinemaGame from './pages/CinemaGame';
import LoginPage from './pages/Login';
import AnonymousRoute from 'commons/routes/AnonymousRoute';
import PrivateRoute from 'commons/routes/PrivateRoute';
import ResetPassword from './pages/ResetPassword';
import CreateAccount from './pages/CreateAccount';
import ScoreBoard from './pages/ScoreBoard';
import { ThemeProvider } from '@mui/material/styles';
import { customTheme } from './styles/Theme';
import MovieScreeningRequest from './pages/MovieScreeningRequest';

const App = () => {
  return (
    <div style={{
      backgroundColor: DarkSecondary,
      minHeight: '100vh',  // This ensures the color covers the full height of the viewport
    }}>
      <ThemeProvider theme={customTheme}>
        <Routes>
          <Route path="/movie-screening-request/" element={<MovieScreeningRequest />} />

          <Route path="/" element={<PrivateRoute loginUrl='/program/filmbazi/login/' />}>
            <Route path="/profile/" element={<Profile />} />
            <Route path="/cinema-game/" element={<CinemaGame />} />
            <Route path="/admin-dashboard/" element={<ProgramManagement />} />
            <Route path="/scoreboard/" element={<ScoreBoard />} />
            <Route index element={<Dashboard />} />
          </Route>

          <Route path="/" element={<AnonymousRoute base='/program/filmbazi/' />}>
            <Route path="/login/" element={<LoginPage />} />
            <Route path="/token-expiration/" element={<LoginPage />} />
            <Route path="/create-account/" element={<CreateAccount />} />
            <Route path="/reset-password/" element={<ResetPassword />} />
          </Route>

        </Routes>
      </ThemeProvider>
    </div>
  );
};

export default App;