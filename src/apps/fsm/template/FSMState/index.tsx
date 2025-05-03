import React, { FC } from 'react';
import WorkshopFSMState, { WorkshopFSMStatePropsType } from './WorkshopFSMState';
import useGetFSMState from 'apps/fsm/hooks/useGetFSMState';
import BoardFSMState, { BoardFSMStatePropsType } from './BoardFSMState';

type FSMStatePropsType = WorkshopFSMStatePropsType | BoardFSMStatePropsType;

const FSMState: FC<FSMStatePropsType> = ({
  fsmStateId,
}) => {
  const { fsmState } = useGetFSMState({ fsmStateId })

  if (fsmState?.template === 'board') {
    return (
      <BoardFSMState fsmStateId={fsmStateId} />
    );
  }

  if (fsmState?.template === 'normal') {
    return (
      <WorkshopFSMState fsmStateId={fsmStateId} />
    );
  }
}

export default FSMState;