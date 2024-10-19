import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { DarkSecondary } from '../ashbaria/constants/colors';
import { ThemeProvider } from '@mui/material/styles';
import { customTheme } from '../ashbaria/styles/Theme';
import CssBaseline from '@mui/material/CssBaseline';
import PrivateRoute from 'commons/routes/PrivateRoute';
import AnonymousRoute from 'commons/routes/AnonymousRoute';
import GameMenu from './pages/Menu';
import ProgramManagement from './pages/ProgramManagement';
import FSM from 'apps/fsm/pages/FSM';
import FSMManagement from 'apps/fsm/pages/FSMManagement';
import FriendsNetwork from './components/organisms/FriendsNetwork';
const App = () => {

  return (
    <div style={{
      backgroundColor: DarkSecondary,
      minHeight: '100vh',
    }}>
      <ThemeProvider theme={customTheme}>
        <CssBaseline />
        <Routes>

          <Route path="/" element={<PrivateRoute loginUrl='/program/ashbaria/login/' />}>
            <Route path="/" element={<GameMenu />} />
            <Route path="/court/:fsmId/" element={<FSM />} />
            <Route path="/court/:fsmId/manage/" element={<FSMManagement />} />
            <Route path="/manage/" element={<ProgramManagement />} />
            <Route path='/friends' element={<FriendsNetwork />} />
          </Route>

          <Route path="/" element={<AnonymousRoute base='/program/filmbazi/' />}>
          </Route>

        </Routes>
      </ThemeProvider>
    </div>
  );
};

export default App;