import React, { FC } from 'react';
import ColumnsFSMState, { ColumnsFSMStatePropsType } from './ColumnsFSMState';
import BoardFSMState, { BoardFSMStatePropsType } from './BoardFSMState';
import { useFSMContext } from 'commons/hooks/useFSMContext';
import { useGetFSMQuery } from 'apps/fsm/redux/slices/fsm/FSMSlice';

type FSMStatePropsType = ColumnsFSMStatePropsType | BoardFSMStatePropsType;

const FSMState: FC<FSMStatePropsType> = ({ fsmStateId }) => {
  const { fsmId } = useFSMContext();
  const { data: fsm } = useGetFSMQuery({ fsmId });

  if (!fsm) return null;

  const { width, height, mode } = fsm.scene;

  // if height > width, we want to fit to width; otherwise fit to height
  const fitMode = height > width ? 'fit-width' : 'fit-height';

  if (mode === 'board') {
    return (
      <BoardFSMState
        fsmStateId={fsmStateId}
        mode={fitMode}
      />
    );
  }

  if (mode === 'normal') {
    return (
      <ColumnsFSMState
        fsmStateId={fsmStateId}
      />
    );
  }

  return null;
};

export default FSMState;