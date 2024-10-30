import React, { FC } from 'react';
import WorkshopFSMState, { WorkshopFSMStatePropsType } from './WorkshopFSMState';
import { useGetFSMStateQuery } from 'apps/fsm/redux/slices/fsm/FSMStateSlice';
import BoardFSMState, { BoardFSMStatePropsType } from './BoardFSMState';
import Layout from 'commons/template/Layout';

type FSMStatePropsType = WorkshopFSMStatePropsType | BoardFSMStatePropsType;

const FSMState: FC<FSMStatePropsType> = ({
  fsmStateId,
}) => {
  const { data: fsmState } = useGetFSMStateQuery({ fsmStateId })
  // todo:
  const isMentor = false;

  if (fsmState?.template === 'board') {
    return (<BoardFSMState fsmStateId={fsmStateId} />)
  }

  if (fsmState?.template === 'normal') {
    <Layout appbarMode={isMentor ? 'MENTOR_FSM' : 'FSM'}>
      <WorkshopFSMState fsmStateId={fsmStateId} />
    </Layout>
  }
}

export default FSMState;