import React, { FC } from 'react';
import ColumnsFSMState, { ColumnsFSMStatePropsType } from './ColumnsFSMState';
import BoardFSMState, { BoardFSMStatePropsType } from './BoardFSMState';
import { useFSMContext } from 'commons/hooks/useFSMContext';
import { useGetFSMQuery } from 'apps/fsm/redux/slices/fsm/FSMSlice';
import useWindowDimensions from 'commons/hooks/useWindowDimensions';

type FSMStatePropsType = ColumnsFSMStatePropsType | BoardFSMStatePropsType;

const FSMState: FC<FSMStatePropsType> = ({ fsmStateId }) => {
  const { fsmId } = useFSMContext();
  const { data: fsm } = useGetFSMQuery({ fsmId });
  const { width, height } = useWindowDimensions();

  if (!fsm) return null;

  const { mode } = fsm?.scene;

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