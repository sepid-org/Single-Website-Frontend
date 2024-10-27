import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { customTheme } from '../ashbaria/styles/Theme';
import CssBaseline from '@mui/material/CssBaseline';
import PrivateRoute from 'commons/routes/PrivateRoute';
import AnonymousRoute from 'commons/routes/AnonymousRoute';
import GameMenu from './pages/Menu';
import ProgramManagement from './pages/ProgramManagement';
import FSMManagement from 'apps/fsm/pages/FSMManagement';
import FriendshipNetwork from './components/organisms/FriendshipNetwork';
import Profile from './pages/Profile';
import CourtInfo from './pages/CourtInfo';
import LandscapeCheckWrapper from './components/organisms/LandscapeCheckWrapper';
import CustomStylesWrapper from './styles/CustomStylesWrapper';
import EnterPhoneNumber from './pages/login/EnterPhoneNumber';
import FSM from './gandekari/FSM';

const App = () => {

  return (
    <ThemeProvider theme={customTheme}>
      <CustomStylesWrapper>
        <CssBaseline />
        <LandscapeCheckWrapper>

          <Routes>
            <Route path="/" element={<PrivateRoute loginUrl='/program/ashbaria/login/' />}>
              <Route path="/" element={<GameMenu />} />
              <Route path='/court/:fsmId/plate/' element={<CourtInfo />} />
              <Route path="/court/:fsmId/" element={<FSM />} />
              <Route path="/court/:fsmId/manage/" element={<FSMManagement />} />
              <Route path="/manage/" element={<ProgramManagement />} />
              <Route path='/friendship-network/' element={<FriendshipNetwork />} />
              <Route path='/profile/' element={<Profile />} />
            </Route>
            <Route path="/" element={<AnonymousRoute base='/program/ashbaria/' />}>
              <Route path='/login/' element={<EnterPhoneNumber />} />
            </Route>
          </Routes>

        </LandscapeCheckWrapper>
      </CustomStylesWrapper>
    </ThemeProvider>
  );
};

export default App;