import React, { FC } from 'react';
import WorkshopFSMState, { WorkshopFSMStatePropsType } from './WorkshopFSMState';
import { useGetFSMStateQuery } from 'apps/fsm/redux/slices/fsm/FSMStateSlice';
import BoardFSMState, { BoardFSMStatePropsType } from './BoardFSMState';

type FSMStatePropsType = WorkshopFSMStatePropsType | BoardFSMStatePropsType;

const FSMState: FC<FSMStatePropsType> = ({
  fsmStateId,
}) => {
  const { data: fsmState } = useGetFSMStateQuery({ fsmStateId }, { skip: !Boolean(fsmStateId) })

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