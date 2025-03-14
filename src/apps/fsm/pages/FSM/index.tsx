import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

import {
  useGetMyPlayerQuery,
} from 'apps/fsm/redux/slices/fsm/PlayerSlice';
import FSMStart from './FSMStart';
import FSMBody from './Body';

type PropsType = {}

const FSM: FC<PropsType> = ({ }) => {
  const fsmId = parseInt(useParams().fsmId);
  const { data: player } = useGetMyPlayerQuery({ fsmId });

  if (player && !player.started_at) {
    return (
      <FSMStart />
    )
  };

  if (player && player.started_at) {
    return (
      <FSMBody />
    )
  }
};

export default FSM;