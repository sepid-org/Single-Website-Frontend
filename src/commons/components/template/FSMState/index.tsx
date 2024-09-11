import React, { FC } from 'react';
import WorkshopFSMState, { WorkshopFSMStatePropsType } from './WorkshopFSMState';
import { useGetFSMStateQuery } from 'apps/website-display/redux/features/fsm/FSMStateSlice';
import BoardFSMState, { BoardFSMStatePropsType } from './BoardFSMState';
import Layout from '../Layout';

type FSMStatePropsType = WorkshopFSMStatePropsType | BoardFSMStatePropsType;

const FSMState: FC<FSMStatePropsType> = (props) => {
  const { data: state } = useGetFSMStateQuery({ fsmStateId: props.stateId })

  if (state?.template === 'board') {
    return <BoardFSMState {...props} />
  }

  if (props.type === 'workshop') {
    return (
      <Layout appbarMode={props.isMentor ? 'MENTOR_FSM' : 'FSM'}>
        <WorkshopFSMState {...props} />
      </Layout>)
  }
}

export default FSMState;
