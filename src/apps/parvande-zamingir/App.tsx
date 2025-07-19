import React from 'react';
import { Outlet, Route, Routes, useParams } from 'react-router-dom';

import { retryImport } from 'commons/utils/retryImport';
import PrivateRoute from 'commons/routes/PrivateRoute';
import NotFoundPage from 'commons/pages/NotFoundPage';
import Authentication from '../program/pages/Authentication';
import AnonymousRoute from 'commons/routes/AnonymousRoute';
import ProgramAccessGuard from '../program/template/ProgramAccessGuard';
import Menu from '../program/pages/Menu';

const Registration = React.lazy(() =>
  retryImport(() => import('apps/program/pages/Registration'))
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

      <Route element={<AnonymousRoute base={`/program/${programSlug}/`} />}>
        <Route path="/auth/:tabName?" element={<Authentication />} />
      </Route>

      <Route element={<PrivateRoute loginUrl={`/program/${programSlug}/auth/`} />}>
        <Route path="/registration/" element={<Registration />} />
        <Route path="/scoreboard/" element={<ScoreBoard />} />
        <Route path="/manage/" element={<ProgramManagement />} />

        <Route element={
          <ProgramAccessGuard>
            <Outlet />
          </ProgramAccessGuard>
        }>
          <Route index element={<Menu />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
