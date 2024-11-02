import React, { FC, useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';

import { initParseServer } from 'apps/website-display/parse/init';
import {
  changeOpenChatRoomAction,
} from 'apps/website-display/redux/slices/currentState';
import DraggableChatRoom from 'commons/components/organisms/DraggableMeeting';
import { useGetFSMQuery } from 'apps/fsm/redux/slices/fsm/FSMSlice';
import {
  useGetPlayerQuery,
  useGetMyPlayerQuery,
} from 'apps/fsm/redux/slices/fsm/PlayerSlice';
import FSMState from '../template/FSMState';
import useUserProfile from 'commons/hooks/useUserProfile';
import { FSMStateProvider } from 'commons/hooks/useFSMStateContext';
import { FSMProvider } from 'commons/hooks/useFSMContext';
import useStartFSM from 'commons/hooks/fsm/useStartFSM';
import { useGetProgramUserFSMsStatusQuery } from 'apps/website-display/redux/features/program/ProgramSlice';

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
  const fsmId = parseInt(useParams().fsmId);
  const { data: fsm } = useGetFSMQuery({ fsmId });
  const subscriberRef = useRef(null);
  const search = useLocation().search;
  const { data: myPlayer, refetch: refetchMyPlayer } = useGetMyPlayerQuery({ fsmId });
  let teamHeadPlayerId = new URLSearchParams(search).get('playerId');
  const { data: teamHeadPlayer } = useGetPlayerQuery({ playerId: teamHeadPlayerId }, { skip: !Boolean(teamHeadPlayerId) });
  const player = teamHeadPlayer || myPlayer;
  const isMentor = Boolean(teamHeadPlayerId);
  teamId = new URLSearchParams(search).get('teamId') || teamId
  const [startFSM, result] = useStartFSM();
  const { data: { fullName, id: mentorId } } = useUserProfile();

  const { data: userFSMsStatus } = useGetProgramUserFSMsStatusQuery({ programSlug: fsm?.program_slug }, { skip: !Boolean(fsm?.program_slug) });
  const currentUserFSMStatus = userFSMsStatus?.find(status => status.fsm_id === fsmId);
  // const isMentor = currentUserFSMStatus?.is_mentor;

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
    // if (!player?.current_state?.id || !parseTeamStateId) return;
    // if (+parseTeamStateId !== +player?.current_state.id) {
    //   if (isMentor) {
    //     toast.info('یکی از دانش‌آموزان مکان تیم رو جا‌به‌جا کرد');
    //     mentorGetCurrentState({ id: teamHeadPlayerId });
    //   } else {
    //     // با حرکت خود بازیکن هم، اینجا اجرا میشه!‌ نباید اینطوری باشه
    //     // toast.info('جابه‌جا شدید');
    //     refetchMyPlayer();
    //   }
    // }
  }, [parseTeamStateId]);

  useEffect(() => {
    // if (!teamId || !player?.current_state) return;
    // const subscribe = async (teamId) => {
    //   const teamState = await getTeamState(teamId)
    //   if (!teamState) {
    //     await createTeamState(teamId, player?.current_state.toString(), player?.current_state.title, moment().format('HH:mm:ss'))
    //   }
    //   const subscriber = await getChangeTeamStateSubscription({
    //     uuid: teamId,
    //   });
    //   subscriber.on('create', onUpdateStateFromParse);
    //   subscriber.on('update', onUpdateStateFromParse);
    //   subscriberRef.current = subscriber;
    // }
    // subscribe(teamId);
    // return () => {
    //   subscriberRef.current?.unsubscribe();
    // }
  }, [teamId, player]);

  useEffect(() => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }, [player])

  // todo:
  useEffect(() => {
    if (player && !player.current_state) {
      startFSM({ fsmId: fsm.id });
    }
  }, [player]);

  if (!player?.current_state || !fsm) return null;

  return (
    <FSMProvider fsmId={fsmId}>
      <FSMStateProvider
        fsmStateId={player?.current_state}
        isMentor={false}
        teamId={teamId}
        playerId={player?.id}
      >
        <FSMState fsmStateId={player?.current_state} />
        {(fsm.fsm_p_type == 'Team' || fsm.fsm_learning_type == 'Supervised') &&
          <DraggableChatRoom open={openChatRoom} handleClose={() => changeOpenChatRoom()} />
        }
      </FSMStateProvider>
    </FSMProvider>
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
