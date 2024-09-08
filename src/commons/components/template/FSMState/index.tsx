import React, { FC } from 'react';
import WorkshopFSMState, { WorkshopFSMStatePropsType } from './WorkshopFSMState';
import { useGetFSMStateQuery } from 'apps/website-display/redux/features/fsm/FSMStateSlice';
import BoardFSMState from './template/BoardFSMState';

type FSMStatePropsType = WorkshopFSMStatePropsType;

const FSMState: FC<FSMStatePropsType> = (props) => {
  const { data: state } = useGetFSMStateQuery({ fsmStateId: props.stateId })

  if (state?.template === 'board') {
    return <BoardFSMState fsmStateId={props.stateId} />
  }

  if (props.type === 'workshop') {
    return <WorkshopFSMState {...props} />
  }
}

export default FSMState;
