import React, { FC } from 'react';
import WorkshopFSMState, { WorkshopFSMStatePropsType } from './WorkshopFSMState';
import { useGetFSMStateQuery } from 'apps/fsm/redux/slices/fsm/FSMStateSlice';
import BoardFSMState, { BoardFSMStatePropsType } from './BoardFSMState';
import Layout from 'commons/template/Layout';
import { useLocation, useParams } from 'react-router-dom';
import { useGetMyPlayerQuery, useGetPlayerQuery } from 'apps/fsm/redux/slices/fsm/PlayerSlice';
import { FSMStateProvider } from 'commons/hooks/useFSMStateContext';
import WIDGET_TYPE_MAPPER from 'commons/components/organisms/Widget/useWidgetFactory/WidgetTypeMapper';

type FSMStatePropsType = WorkshopFSMStatePropsType | BoardFSMStatePropsType;

const FSMState: FC<FSMStatePropsType> = ({
  fsmStateId,
}) => {
  const { data: fsmState } = useGetFSMStateQuery({ fsmStateId })
  const { fsmId } = useParams();
  const search = useLocation().search;
  const { data: myPlayer, refetch: refetchMyPlayer } = useGetMyPlayerQuery({ fsmId });
  let teamHeadPlayerId = new URLSearchParams(search).get('playerId');
  const { data: teamHeadPlayer } = useGetPlayerQuery({ playerId: teamHeadPlayerId }, { skip: !Boolean(teamHeadPlayerId) });
  const player = teamHeadPlayer || myPlayer;
  const isMentor = Boolean(teamHeadPlayerId);
  const teamId = new URLSearchParams(search).get('teamId');

  return (
    <FSMStateProvider
      fsmStateId={fsmStateId}
      isMentor={isMentor}
      teamId={teamId}
      playerId={player?.id}
      WIDGET_TYPE_MAPPER={WIDGET_TYPE_MAPPER}
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