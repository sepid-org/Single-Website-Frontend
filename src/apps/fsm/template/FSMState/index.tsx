import React, { FC } from 'react';
import WorkshopFSMState, { WorkshopFSMStatePropsType } from './WorkshopFSMState';
import BoardFSMState, { BoardFSMStatePropsType } from './BoardFSMState';
import useFSMState from 'apps/fsm/hooks/useFSMState';
import { useFSMContext } from 'commons/hooks/useFSMContext';
import { useGetFSMQuery } from 'apps/fsm/redux/slices/fsm/FSMSlice';

type FSMStatePropsType = WorkshopFSMStatePropsType | BoardFSMStatePropsType;

const FSMState: FC<FSMStatePropsType> = ({
  fsmStateId,
}) => {
  const { fsmId } = useFSMContext();
  const { data: fsm } = useGetFSMQuery({ fsmId });

  if (fsm?.scene.mode === 'board') {
    return (
      <BoardFSMState
        fsmStateId={fsmStateId}
        mode='fit-height'
      />
    );
  }

  if (fsm?.scene.mode === 'normal') {
    return (
      <WorkshopFSMState fsmStateId={fsmStateId} />
    );
  }
}

export default FSMState;