import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { DarkSecondary } from '../ashbaria/constants/colors';
import { ThemeProvider } from '@mui/material/styles';
import { customTheme } from '../ashbaria/styles/Theme';
import PrivateRoute from 'commons/routes/PrivateRoute';
import AnonymousRoute from 'commons/routes/AnonymousRoute';
import GameMenu from './pages/Menu';
import ProgramManagement from './pages/ProgramManagement';
import './styles/fonts.css';

const App = () => {

  return (
    <div style={{
      backgroundColor: DarkSecondary,
      minHeight: '100vh',
    }}>
      <ThemeProvider theme={customTheme}>
        <Routes>

          <Route path="/" element={<PrivateRoute loginUrl='/program/ashbaria/login/' />}>
            <Route path="/" element={<GameMenu />} />
            <Route path="/manage/" element={<ProgramManagement />} />
          </Route>

          <Route path="/" element={<AnonymousRoute base='/program/filmbazi/' />}>
          </Route>

        </Routes>
      </ThemeProvider>
    </div>
  );
};

export default App;