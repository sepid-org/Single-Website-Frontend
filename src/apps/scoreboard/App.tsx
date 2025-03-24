import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { retryImport } from 'commons/utils/retryImport';
import PrivateRoute from 'commons/routes/PrivateRoute';

const ScoreBoard = React.lazy(() =>
  retryImport(() => import('apps/scoreboard/pages/ScoreBoard'))
);

const App = () => {

  return (
    <Routes>

      <Route path="/scoreboard/" element={<ScoreBoard />} />

      <Route path="" element={<PrivateRoute />}>
      </Route>

    </Routes>
  );
};

export default App;
