import React, { FC, Fragment } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { Route, Routes } from 'react-router-dom';

import { useGetFSMQuery } from 'apps/website-display/redux/features/fsm/FSMSlice';
import {
  useGetPlayerQuery,
  useGetMyPlayerQuery,
} from 'apps/website-display/redux/features/program/PlayerSlice';
import { FSMProvider } from 'commons/hooks/useFSMContext';
import PrivateRoute from 'commons/routes/PrivateRoute';
import NotFoundPage from 'commons/pages/NotFoundPage';
import FSM from './pages/FSM';
import Correction from './pages/Correction';
import FSMManagement from './pages/FSMManagement';


type FSMPagePropsType = {}

const App: FC<FSMPagePropsType> = ({ }) => {
  const { fsmId } = useParams();
  const { data: fsm } = useGetFSMQuery({ fsmId });
  const { data: myPlayer } = useGetMyPlayerQuery({ fsmId });
  const search = useLocation().search;
  const teamHeadPlayerId = new URLSearchParams(search).get('playerId');
  const { data: teamHeadPlayer } = useGetPlayerQuery({ playerId: teamHeadPlayerId }, { skip: !Boolean(teamHeadPlayerId) });
  const player = teamHeadPlayer || myPlayer;
  const isMentor = Boolean(teamHeadPlayerId);
  const teamId = new URLSearchParams(search).get('teamId') || myPlayer?.team?.id;

  return (
    <Fragment>
      {fsm &&
        <Helmet>
          <title>{fsm?.name}</title>
        </Helmet>
      }
      <FSMProvider
        fsmStateId={(player?.current_state as any)}
        isMentor={isMentor}
        teamId={teamId}
        playerId={player?.id}
      >
        <Routes>
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<FSM />} />
            <Route path="/manage/correction/:answerId/" element={<Correction />} />
            <Route path="/manage/" element={<FSMManagement />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>

      </FSMProvider>
    </Fragment>
  );
};


export default App;