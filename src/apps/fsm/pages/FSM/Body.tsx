import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetFSMQuery } from 'apps/fsm/redux/slices/fsm/FSMSlice';
import {
  useGetCurrentUserPlayerQuery,
} from 'apps/fsm/redux/slices/fsm/PlayerSlice';
import FSMState from 'apps/fsm/template/FSMState';
import { FSMStateProvider } from 'commons/hooks/useFSMStateContext';
import { FSMProvider } from 'commons/hooks/useFSMContext';

type PropsType = {}

const FSMBody: FC<PropsType> = ({ }) => {
  const fsmId = parseInt(useParams().fsmId);
  const { data: fsm } = useGetFSMQuery({ fsmId });
  const { data: player } = useGetCurrentUserPlayerQuery({ fsmId });

  useEffect(() => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }, [player])

  if (!fsm) return null;

  return (
    <FSMProvider fsmId={fsmId}>
      <FSMStateProvider
        fsmStateId={player?.current_state}
        isMentor={false}
      >
        <FSMState fsmStateId={player?.current_state} />
      </FSMStateProvider>
    </FSMProvider>
  );
};

export default FSMBody;