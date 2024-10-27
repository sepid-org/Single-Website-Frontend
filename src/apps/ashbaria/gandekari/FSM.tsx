import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

import {
  useGetMyPlayerQuery,
} from 'apps/fsm/redux/slices/fsm/PlayerSlice';
import BoardFSMState from './BoardFSMState';
import { FSMStateProvider } from 'commons/hooks/useFSMStateContext';
import WIDGET_TYPE_MAPPER from 'commons/components/organisms/Widget/useWidgetFactory/WidgetTypeMapper';


type FSMPagePropsType = {}

const FSM: FC<FSMPagePropsType> = ({ }) => {
  const { fsmId } = useParams();
  const { data: player } = useGetMyPlayerQuery({ fsmId });

  const CUSTOM_WIDGET_TYPE_MAPPER = {
    ...WIDGET_TYPE_MAPPER,
    MultiChoiceProblem: {
      ...WIDGET_TYPE_MAPPER['MultiChoiceProblem'],
      WidgetComponent: WIDGET_TYPE_MAPPER['MultiChoiceProblem'].WidgetComponent,
    },
  }

  return (
    <FSMStateProvider
      fsmStateId={player?.current_state}
      playerId={player?.id}
      WIDGET_TYPE_MAPPER={CUSTOM_WIDGET_TYPE_MAPPER}
    >
      <BoardFSMState fsmStateId={(player?.current_state as any)} />
    </FSMStateProvider>
  );
};

export default FSM;
