import React from 'react';
import { Outlet, Route, Routes, useParams } from 'react-router-dom';

import { retryImport } from 'commons/utils/retryImport';
import PrivateRoute from 'commons/routes/PrivateRoute';
import NotFoundPage from 'commons/pages/NotFoundPage';
import Authentication from './pages/Authentication';
import AnonymousRoute from 'commons/routes/AnonymousRoute';
import ProgramAccessGuard from '../program/template/ProgramAccessGuard';
import Menu from '../program/pages/Menu';
import Profile from './pages/Profile';
import CodesPage from './pages/Codes';
import ScoreBoard from './pages/ScoreBoard';

const ProgramManagement = React.lazy(() =>
  retryImport(() => import('apps/program/pages/ProgramManagement'))
);


const App = () => {
  const { programSlug } = useParams();

  return (
    <Routes>

      <Route element={<AnonymousRoute base={`/program/${programSlug}/`} />}>
        <Route path="/auth/:tabName?" element={<Authentication />} />
      </Route>

      <Route element={<PrivateRoute loginUrl={`/program/${programSlug}/auth/`} />}>
        <Route path="/profile/" element={<Profile />} />
        <Route path="/codes/" element={<CodesPage />} />
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
