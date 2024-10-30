import React, { FC } from 'react';
import { useGetFSMStateQuery } from 'apps/fsm/redux/slices/fsm/FSMStateSlice';
import { Box } from '@mui/material';
import PapersBoardScene from 'commons/template/Paper/PapersBoardScene';
import useAshbariaCustomWidgets from '../hooks/useAshbariaCustomWidgets';

export type BoardFSMStatePropsType = {
  fsmStateId: string;
};

const BoardFSMState: FC<BoardFSMStatePropsType> = ({ fsmStateId }) => {
  const { data: fsmState } = useGetFSMStateQuery({ fsmStateId }, { skip: !Boolean(fsmStateId) });
  const { complementaryObjects } = useAshbariaCustomWidgets();

  return (
    <PapersBoardScene
      complementaryObjects={complementaryObjects}
      paperIds={fsmState?.papers}
    />
  );
};

export default BoardFSMState;
