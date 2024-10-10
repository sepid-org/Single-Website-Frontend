import React, { FC } from 'react';
import WorkshopFSMState, { WorkshopFSMStatePropsType } from './WorkshopFSMState';
import { useGetFSMStateQuery } from 'apps/website-display/redux/features/fsm/FSMStateSlice';
import BoardFSMState, { BoardFSMStatePropsType } from './BoardFSMState';
import Layout from '../Layout';
import { useFSMContext } from 'commons/hooks/useFSMContext';

type FSMStatePropsType = WorkshopFSMStatePropsType | BoardFSMStatePropsType;

const FSMState: FC<FSMStatePropsType> = () => {
  const { fsmStateId, isMentor } = useFSMContext()
  const { data: state } = useGetFSMStateQuery({ fsmStateId })

  if (state?.template === 'board') {
    return <BoardFSMState />
  }

  if (state?.template === 'normal') {
    return (
      <Layout appbarMode={isMentor ? 'MENTOR_FSM' : 'FSM'}>
        <WorkshopFSMState />
      </Layout>)
  }
}

export default FSMState;
