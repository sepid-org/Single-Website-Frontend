import React, { FC } from 'react';
import WorkshopFSMState, { WorkshopFSMStatePropsType } from './WorkshopFSMState';
import { useFSMContext } from 'commons/hooks/useFSMContext';
import BoardFSMState, { BoardFSMStatePropsType } from './BoardFSMState';

type FSMStatePropsType = WorkshopFSMStatePropsType | BoardFSMStatePropsType;

const FSMState: FC<FSMStatePropsType> = ({
  fsmStateId,
}) => {
  const { useGetFSMState } = useFSMContext();
  const { fsmState } = useGetFSMState({ fsmStateId: parseInt(fsmStateId) })

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