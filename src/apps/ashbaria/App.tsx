import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { customTheme } from '../ashbaria/styles/Theme';
import CssBaseline from '@mui/material/CssBaseline';
import PrivateRoute from 'commons/routes/PrivateRoute';
import AnonymousRoute from 'commons/routes/AnonymousRoute';
import OldGameMenu from './pages/OldGameMenu';
import ProgramManagement from './pages/ProgramManagement';
import FSMManagement from 'apps/fsm/pages/FSMManagement';
import FriendshipNetworkPage from './pages/FriendshipNetwork';
import Profile from './pages/Profile';
import CourtInfo from './pages/court/CourtInfo';
import LandscapeCheckWrapper from './components/organisms/LandscapeCheckWrapper';
import CustomStylesWrapper from './styles/CustomStylesWrapper';
import CourtPage from './pages/court/Court';
import Login from './pages/Login';
import Introduction from './pages/Introduction';
import GameMenu from './pages/GameMenu';
import ExamPage from './pages/exam/Exam';
import StartExamPage from './pages/exam/Start';
import ExamResultPage from './pages/exam/Result';
import WhatHappenedPage from './pages/WhatHappened';
import ScoreBoard from './pages/ScoreBoard';
import Survey from './pages/Survey';

const App = () => {

  return (
    <ThemeProvider theme={customTheme}>
      <CustomStylesWrapper>
        <CssBaseline />
        <LandscapeCheckWrapper>

          <Routes>
            <Route path="/" element={<PrivateRoute loginUrl='/program/ashbaria/login/' />}>
              <Route index element={<GameMenu />} />
              <Route path='/exam-result/' element={<ExamResultPage />} />
              <Route path='/start-exam/' element={<StartExamPage />} />
              <Route path='/exam/' element={<ExamPage />} />
              <Route path='/what-happened/' element={<WhatHappenedPage />} />
              <Route path='/menu/' element={<GameMenu />} />
              <Route path='/mentors/' element={<OldGameMenu />} />
              <Route path='/court/:fsmId/info/' element={<CourtInfo />} />
              <Route path="/court/:fsmId/" element={<CourtPage />} />
              <Route path="/court/:fsmId/manage/" element={<FSMManagement />} />
              <Route path="/manage/" element={<ProgramManagement />} />
              <Route path='/friendship-network/' element={<FriendshipNetworkPage />} />
              <Route path='/profile/' element={<Profile />} />
              <Route path='/introduction/' element={<Introduction />} />
              <Route path='/scoreboard/' element={<ScoreBoard />} />
              <Route path='/survey/' element={<Survey />} />
            </Route>

            <Route path="/" element={<AnonymousRoute base='/program/ashbaria/' />}>
              <Route path='/login/' element={<Login />} />
              <Route path='/token-expiration/' element={<Login />} />
            </Route>
          </Routes>

        </LandscapeCheckWrapper>
      </CustomStylesWrapper>
    </ThemeProvider>
  );
};

export default App;