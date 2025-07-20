import React from 'react';
import { Outlet, Route, Routes, useParams } from 'react-router-dom';

import { retryImport } from 'commons/utils/retryImport';
import PrivateRoute from 'commons/routes/PrivateRoute';
import NotFoundPage from 'commons/pages/NotFoundPage';
import PurchaseResult from './pages/PurchaseResult';
import Authentication from './pages/Authentication';
import AnonymousRoute from 'commons/routes/AnonymousRoute';
import ProgramAccessGuard from './template/ProgramAccessGuard';
import Menu from './pages/Menu';

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

const AshbariaApp = React.lazy(() =>
  retryImport(() => import('apps/ashbaria/App'))
);

const FilmBaziApp = React.lazy(() =>
  retryImport(() => import('apps/film-bazi/App'))
);

const ParvandeZamingirApp = React.lazy(() =>
  retryImport(() => import('apps/parvande-zamingir/App'))
);

const App = () => {
  const { programSlug } = useParams();

  if (programSlug === 'filmbazi') {
    return <FilmBaziApp />
  }

  if (programSlug === 'ashbaria') {
    return <AshbariaApp />
  }


  if (programSlug === 'parvande-zamingir') {
    return <ParvandeZamingirApp />
  }

  return (
    <Routes>
      <Route element={<AnonymousRoute base={`/program/${programSlug}/`} />}>
        <Route path="/auth/:tabName?" element={<Authentication />} />
      </Route>

      <Route element={<PrivateRoute loginUrl={`/program/${programSlug}/auth/`} />}>
        <Route path="/registration/" element={<Registration />} />
        <Route path="/purchase/" element={<PurchaseResult />} />
        <Route path="/scoreboard/" element={<ScoreBoard />} />
        <Route path="/manage/" element={<ProgramManagement />} />

        <Route element={
          <ProgramAccessGuard>
            <Outlet />
          </ProgramAccessGuard>
        }>
          <Route index element={<Menu />} />
          <Route path="/team-setting/" element={<TeamSetting />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
