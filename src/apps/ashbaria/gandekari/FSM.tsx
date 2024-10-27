import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

import {
  useGetMyPlayerQuery,
} from 'apps/fsm/redux/slices/fsm/PlayerSlice';
import BoardFSMState from './BoardFSMState';


type FSMPagePropsType = {}

const FSM: FC<FSMPagePropsType> = ({ }) => {
  const { fsmId } = useParams();
  const { data: player } = useGetMyPlayerQuery({ fsmId });

  return (
    <BoardFSMState fsmStateId={(player?.current_state as any)} />
  );
};

export default FSM;
