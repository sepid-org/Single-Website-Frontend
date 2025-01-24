import React from 'react';
import { Route, Routes, useParams } from 'react-router-dom';

import { retryImport } from 'commons/utils/retryImport';
import PrivateRoute from 'commons/routes/PrivateRoute';
import TeamSetting from './pages/TeamSetting';
import Registration from './pages/Registration';
import ProgramManagement from './pages/ProgramManagement';
import NotFoundPage from 'commons/pages/NotFoundPage';
import Program from './pages/Program';
import PurchaseResult from './pages/PurchaseResult';

const AshbariaApp = React.lazy(() =>
  retryImport(() => import('apps/ashbaria/App'))
);

const FilmBaziApp = React.lazy(() =>
  retryImport(() => import('apps/film-bazi/App'))
);

const App = () => {
  const { programSlug } = useParams();

  if (programSlug === 'filmbazi') {
    return <FilmBaziApp />
  }

  if (programSlug === 'ashbaria') {
    return <AshbariaApp />
  }

  return (
    <Routes>

      <Route path="/registration/" element={<Registration />} />

      <Route path="" element={<PrivateRoute />}>
        <Route index element={<Program />} />
        <Route path="/team-setting/" element={<TeamSetting />} />
        <Route path="/manage/" element={<ProgramManagement />} />
        <Route path="/purchase/" element={<PurchaseResult />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
