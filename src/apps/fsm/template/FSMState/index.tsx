import React, { FC } from 'react';
import WorkshopFSMState, { WorkshopFSMStatePropsType } from './WorkshopFSMState';
import BoardFSMState, { BoardFSMStatePropsType } from './BoardFSMState';
import useFSMState from 'apps/fsm/hooks/useFSMState';

type FSMStatePropsType = WorkshopFSMStatePropsType | BoardFSMStatePropsType;

const FSMState: FC<FSMStatePropsType> = ({
  fsmStateId,
}) => {
  const { fsmState } = useFSMState(parseInt(fsmStateId));

  if (fsmState?.template === 'board') {
    return (
      <BoardFSMState
        fsmStateId={fsmStateId}
        mode='fit-height'
      />
    );
  }

  if (fsmState?.template === 'normal') {
    return (
      <WorkshopFSMState fsmStateId={fsmStateId} />
    );
  }
}

export default FSMState;