import React, { FC, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { Route, Routes } from 'react-router-dom';

import { useGetFSMQuery } from 'apps/fsm/redux/slices/fsm/FSMSlice';
import PrivateRoute from 'commons/routes/PrivateRoute';
import NotFoundPage from 'commons/pages/NotFoundPage';
import { retryImport } from 'commons/utils/retryImport';
import PlayerPerformance from './pages/PlayerPerformance';
import FSM from './pages/FSM';

const Correction = React.lazy(() =>
  retryImport(() => import('apps/fsm/pages/Correction'))
);


const FSMManagement = React.lazy(() =>
  retryImport(() => import('apps/fsm/pages/FSMManagement'))
);

type FSMPagePropsType = {}

const App: FC<FSMPagePropsType> = ({ }) => {
  const fsmId = parseInt(useParams().fsmId);
  const { data: fsm } = useGetFSMQuery({ fsmId });

  return (
    <Fragment>
      <Helmet>
        <title>{fsm?.name}</title>
      </Helmet>
      <Routes>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<FSM />} />
          <Route path="/player-performance/" element={<PlayerPerformance />} />
          <Route path="/manage/correction/:answerId/" element={<Correction />} />
          <Route path="/manage/" element={<FSMManagement />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Fragment>
  );
};


export default App;