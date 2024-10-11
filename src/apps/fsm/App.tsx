import React, { FC, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { Route, Routes } from 'react-router-dom';

import { useGetFSMQuery } from 'apps/fsm/redux/slices/fsm/FSMSlice';
import PrivateRoute from 'commons/routes/PrivateRoute';
import NotFoundPage from 'commons/pages/NotFoundPage';
import FSM from './pages/FSM';
import Correction from './pages/Correction';
import FSMManagement from './pages/FSMManagement';


type FSMPagePropsType = {}

const App: FC<FSMPagePropsType> = ({ }) => {
  const { fsmId } = useParams();
  const { data: fsm } = useGetFSMQuery({ fsmId });

  return (
    <Fragment>
      <Helmet>
        <title>{fsm?.name}</title>
      </Helmet>
      <Routes>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<FSM />} />
          <Route path="/manage/correction/:answerId/" element={<Correction />} />
          <Route path="/manage/" element={<FSMManagement />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Fragment>
  );
};


export default App;