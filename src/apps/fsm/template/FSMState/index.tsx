import React, { FC, useRef } from 'react';
import WorkshopFSMState, { WorkshopFSMStatePropsType } from './WorkshopFSMState';
import { useGetFSMStateQuery } from 'apps/fsm/redux/slices/fsm/FSMStateSlice';
import BoardFSMState, { BoardFSMStatePropsType } from './BoardFSMState';
import Layout from 'commons/template/Layout';
import { useLocation, useParams } from 'react-router-dom';
import { useGetFSMQuery } from 'apps/fsm/redux/slices/fsm/FSMSlice';
import { useEnterFSMMutation, useGetMyPlayerQuery, useGetPlayerQuery } from 'apps/fsm/redux/slices/fsm/PlayerSlice';
import useUserProfile from 'commons/hooks/useUserProfile';
import { FSMStateProvider } from 'commons/hooks/useFSMStateContext';

type FSMStatePropsType = WorkshopFSMStatePropsType | BoardFSMStatePropsType;

const FSMState: FC<FSMStatePropsType> = ({
  fsmStateId,
}) => {
  const { data: fsmState } = useGetFSMStateQuery({ fsmStateId })
  const { fsmId } = useParams();
  const { data: fsm } = useGetFSMQuery({ fsmId });
  const subscriberRef = useRef(null);
  const search = useLocation().search;
  const { data: myPlayer, refetch: refetchMyPlayer } = useGetMyPlayerQuery({ fsmId });
  let teamHeadPlayerId = new URLSearchParams(search).get('playerId');
  const { data: teamHeadPlayer } = useGetPlayerQuery({ playerId: teamHeadPlayerId }, { skip: !Boolean(teamHeadPlayerId) });
  const player = teamHeadPlayer || myPlayer;
  const isMentor = Boolean(teamHeadPlayerId);
  const teamId = new URLSearchParams(search).get('teamId');
  const [enterFSM, result] = useEnterFSMMutation();
  const { data: { fullName, id: mentorId } } = useUserProfile();


  return (
    <FSMStateProvider
      fsmStateId={fsmStateId}
      fsmState={fsmState}
      isMentor={isMentor}
      teamId={teamId}
      playerId={player?.id}
    >
      {fsmState?.template === 'board' &&
        <BoardFSMState fsmStateId={fsmStateId} />
      }
      {fsmState?.template === 'normal' &&
        <Layout appbarMode={isMentor ? 'MENTOR_FSM' : 'FSM'}>
          <WorkshopFSMState fsmStateId={fsmStateId} />
        </Layout>
      }
    </FSMStateProvider>
  )
}

export default FSMState;