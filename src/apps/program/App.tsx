import React from 'react';
import { Route, Routes, useParams } from 'react-router-dom';

import { retryImport } from 'commons/utils/retryImport';
import PrivateRoute from 'commons/routes/PrivateRoute';
import NotFoundPage from 'commons/pages/NotFoundPage';
import PurchaseResult from './pages/PurchaseResult';
import Authentication from './pages/Authentication';
import AnonymousRoute from 'commons/routes/AnonymousRoute';

const JoinMeeting = React.lazy(() =>
  retryImport(() => import('apps/program/pages/JoinMeeting'))
);

const Registration = React.lazy(() =>
  retryImport(() => import('apps/program/pages/Registration'))
);

const Program = React.lazy(() =>
  retryImport(() => import('apps/program/pages/Program'))
);

const ProgramManagement = React.lazy(() =>
  retryImport(() => import('apps/program/pages/ProgramManagement'))
);

const TeamSetting = React.lazy(() =>
  retryImport(() => import('apps/program/pages/TeamSetting'))
);

const ScoreBoard = React.lazy(() =>
  retryImport(() => import('apps/scoreboard/pages/ScoreBoard'))
);

const App = () => {
  const { programSlug } = useParams();

  return (
    <Routes>
      <Route path="/meeting/:meetingId/" element={<JoinMeeting />} />

      <Route element={<AnonymousRoute base={`/program/${programSlug}/`} />}>
        <Route path="/auth/:tabName?" element={<Authentication />} />
      </Route>

      <Route element={<PrivateRoute loginUrl={`/program/${programSlug}/auth/`} />}>
        <Route index element={<Program />} />
        <Route path="/registration/" element={<Registration />} />
        <Route path="/team-setting/" element={<TeamSetting />} />
        <Route path="/manage/" element={<ProgramManagement />} />
        <Route path="/purchase/" element={<PurchaseResult />} />
        <Route path="/scoreboard/" element={<ScoreBoard />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
