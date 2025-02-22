import React from 'react';

import ChatRoomButton from '../components/ChatRoomButton';
import MentorButton from '../components/MentorButton';
import ReviewAnswersButton from '../components/ReviewAnswersButton';
import TeamAvatar from '../components/TeamAvatar';
import WhiteboardButton from '../components/WhiteboardButton';
import ScoresDialogButton from '../components/ScoresDialogButton';
import DashboardButton from '../components/DashboardButton';
import FSMLogo from '../../../atoms/logos/FSMLogo';
import UserAvatar from '../components/UserAvatar';
import { useParams } from 'react-router-dom';
import { useGetProgramQuery } from 'apps/website-display/redux/features/program/ProgramSlice';
import { useGetFSMQuery } from 'apps/fsm/redux/slices/fsm/FSMSlice';
import BackToProgramButton from '../components/BackToProgramButton';

const FSMAppbarItems = ({ }) => {
  const fsmId = parseInt(useParams().fsmId);
  // todo: refactor: fetch program minimal info (not whole program info!)
  // const { data: program } = useGetProgramQuery({ programSlug });
  const { data: fsm } = useGetFSMQuery({ fsmId });

  const reviewAnswers = <ReviewAnswersButton />
  const chatRoomButton = <ChatRoomButton />;
  const whiteboardButton = <WhiteboardButton />;
  const mentorButton = <MentorButton />;
  const userAvatar = <UserAvatar />
  const teamAvatar = <TeamAvatar />;
  const fsmLogo = <FSMLogo />;
  const scoresDialogButton = <ScoresDialogButton />
  const backToProgram = <BackToProgramButton />;

  const desktopLeftItems = [];
  const desktopRightItems = [fsmLogo];
  const mobileLeftItems = [];
  const mobileRightItems = [fsmLogo];
  const mobileMenuListItems = [];
  const toolbarItems = [];

  // if (fsm?.first_state?.is_exam) {
  //   toolbarItems.push(reviewAnswers);
  // }

  // if (program?.show_scores) {
  //   toolbarItems.push(scoresDialogButton);
  // }

  if (fsm?.fsm_learning_type == 'Supervised') {
    toolbarItems.push(mentorButton)
  }

  if (fsm?.fsm_learning_type == 'Supervised' || fsm?.fsm_p_type == 'Team') {
    toolbarItems.push(whiteboardButton, chatRoomButton)
  }

  desktopLeftItems.push(backToProgram);
  mobileLeftItems.push(backToProgram);

  return {
    toolbarItems,
    desktopLeftItems,
    desktopRightItems,
    mobileLeftItems,
    mobileRightItems,
    mobileMenuListItems,
  };
};

export default FSMAppbarItems;
