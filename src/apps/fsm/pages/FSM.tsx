import React, { FC, Fragment, useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';

import { initParseServer } from 'apps/website-display/parse/init';
import { createTeamState, getChangeTeamStateSubscription, getTeamState } from 'apps/website-display/parse/team';
import {
  changeOpenChatRoomAction,
} from 'apps/website-display/redux/slices/currentState';
import DraggableChatRoom from 'commons/components/organisms/DraggableMeeting';
import { toast } from 'react-toastify';
import { useGetFSMQuery } from 'apps/fsm/redux/slices/fsm/FSMSlice';
import {
  useGetPlayerQuery,
  useGetMyPlayerQuery,
  useEnterFSMMutation,
} from 'apps/fsm/redux/slices/fsm/PlayerSlice';
import FSMState from '../template/FSMState';
import useUserProfile from 'commons/hooks/useUserProfile';

var moment = require('moment');

type FSMPagePropsType = {
  mentorGetCurrentState: any;
  // todo:
  openChatRoom: any;
  changeOpenChatRoom: any;
  mentorId: string;
  teamId: string;
}

const FSM: FC<FSMPagePropsType> = ({
  mentorGetCurrentState,
  // todo:
  openChatRoom,
  changeOpenChatRoom,
  teamId,
}) => {
  const { fsmId } = useParams();
  const { data: fsm } = useGetFSMQuery({ fsmId });
  const subscriberRef = useRef(null);
  const search = useLocation().search;
  const { data: myPlayer, refetch: refetchMyPlayer } = useGetMyPlayerQuery({ fsmId });
  let teamHeadPlayerId = new URLSearchParams(search).get('playerId');
  const { data: teamHeadPlayer } = useGetPlayerQuery({ playerId: teamHeadPlayerId }, { skip: !Boolean(teamHeadPlayerId) });
  const player = teamHeadPlayer || myPlayer;
  const isMentor = Boolean(teamHeadPlayerId);
  teamId = new URLSearchParams(search).get('teamId') || teamId
  const [enterFSM, result] = useEnterFSMMutation();
  const { data: { fullName, id: mentorId } } = useUserProfile();

  let readyToAddMentor = false
  if (teamId !== undefined && mentorId !== undefined && fullName !== undefined) {
    readyToAddMentor = true
  }

  useEffect(() => {
    if (fsm?.fsm_learning_type === 'Supervised' || fsm?.fsm_p_type === 'Team') {
      initParseServer();
    }
  }, [fsm]);

  // useEffect(() => {
  //   let updateInterval
  //   if (!mentorAdded && isMentor && readyToAddMentor) {
  //     addMentorToRoom(teamId, mentorId, fullName)
  //     setMentorAdded(true)
  //     updateMentorTime(teamId, mentorId)
  //     updateInterval = setInterval(() => { updateMentorTime(teamId, mentorId) }, 10000)
  //   }
  //   return (
  //     () => {
  //       if (updateInterval) {
  //         clearInterval(updateInterval)
  //       }
  //     }
  //   )
  // }, [isMentor, readyToAddMentor])

  const [parseTeamStateId, setParseTeamStateId] = useState(null);

  const onUpdateStateFromParse = (teamState) =>
    setParseTeamStateId(teamState.get('fsmStateId'));

  useEffect(() => {
    if (!player?.current_state?.id || !parseTeamStateId) return;
    if (+parseTeamStateId !== +player?.current_state.id) {
      if (isMentor) {
        toast.info('یکی از دانش‌آموزان مکان تیم رو جا‌به‌جا کرد');
        mentorGetCurrentState({ id: teamHeadPlayerId });
      } else {
        // با حرکت خود بازیکن هم، اینجا اجرا میشه!‌ نباید اینطوری باشه
        // toast.info('جابه‌جا شدید');
        refetchMyPlayer();
      }
    }
  }, [parseTeamStateId]);

  useEffect(() => {
    if (!teamId || !player?.current_state) return;
    const subscribe = async (teamId) => {
      const teamState = await getTeamState(teamId)
      if (!teamState) {
        await createTeamState(teamId, player?.current_state.toString(), player?.current_state.title, moment().format('HH:mm:ss'))
      }
      const subscriber = await getChangeTeamStateSubscription({
        uuid: teamId,
      });
      subscriber.on('create', onUpdateStateFromParse);
      subscriber.on('update', onUpdateStateFromParse);
      subscriberRef.current = subscriber;
    }
    subscribe(teamId);
    return () => {
      subscriberRef.current?.unsubscribe();
    }
  }, [teamId, player]);

  useEffect(() => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }, [player])

  useEffect(() => {
    if (player && !player.current_state) {
      enterFSM({ fsmId: fsm.id });
    }
  }, [player]);

  if (!player?.current_state || !fsm) return null;

  return (
    <Fragment>
      <FSMState fsmStateId={(player?.current_state as any)} />
      {(fsm.fsm_p_type == 'Team' || fsm.fsm_learning_type == 'Supervised') &&
        <DraggableChatRoom open={openChatRoom} handleClose={() => changeOpenChatRoom()} />
      }
    </Fragment>
  );
};

const mapStateToProps = (state, ownProps) => ({
  openChatRoom: state.currentState.openChatRoom,
  currentState: state.currentState.fsmState,
  teamId: state.currentState.teamId,
});

export default connect(mapStateToProps, {
  changeOpenChatRoom: changeOpenChatRoomAction,
})(FSM);
