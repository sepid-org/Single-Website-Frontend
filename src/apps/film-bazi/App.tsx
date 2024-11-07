import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import ProgramManagement from './pages/ProgramManagement';
import { DarkSecondary } from './constants/colors';
import CinemaGame from './pages/games/CinemaGame';
import LoginPage from './pages/authentication/Login';
import AnonymousRoute from 'commons/routes/AnonymousRoute';
import PrivateRoute from 'commons/routes/PrivateRoute';
import ResetPassword from './pages/authentication/ResetPassword';
import CreateAccount from './pages/authentication/CreateAccount';
import ScoreBoard from './pages/ScoreBoard';
import { ThemeProvider } from '@mui/material/styles';
import { customTheme } from './styles/Theme';
import MovieScreeningRequest from './pages/MovieScreeningRequest';
import CssBaseline from '@mui/material/CssBaseline';
import CardsGame from './pages/games/CardsGame';


const App = () => {
  return (
    <div style={{
      backgroundColor: DarkSecondary,
      minHeight: '100vh',
    }}>
      <ThemeProvider theme={customTheme}>
        <CssBaseline />
        <Routes>
          <Route path="/movie-screening-request/" element={<MovieScreeningRequest />} />

          <Route path="/" element={<PrivateRoute loginUrl='/program/filmbazi/login/' />}>
            <Route path="/profile/" element={<Profile />} />
            <Route path="/cinema-game/" element={<CinemaGame />} />
            <Route path="/cards-game/" element={<CardsGame />} />
            <Route path="/admin-dashboard/" element={<ProgramManagement />} />
            <Route path="/scoreboard/" element={<ScoreBoard />} />
            <Route path="/games/" element={<Dashboard tab='games' />} />
            <Route path="/films/" element={<Dashboard tab='films' />} />
            <Route index element={<Dashboard tab='films' />} />
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