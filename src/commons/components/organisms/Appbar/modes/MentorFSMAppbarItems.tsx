import React from 'react';
import { useParams, useLocation } from 'react-router-dom'

import UserAvatar from '../components/UserAvatar';
import DashboardButton from '../components/DashboardButton';
import ChatRoomButton from '../components/ChatRoomButton';
import TeamAvatar from '../components/TeamAvatar';
import WhiteboardButton from '../components/WhiteboardButton';
import { useGetFSMQuery } from 'apps/fsm/redux/slices/fsm/FSMSlice';

const MentorFSMAppbarItems = ({ }) => {
  const fsmId = parseInt(useParams().fsmId);
  const { data: fsm } = useGetFSMQuery({ fsmId });

  const search = useLocation().search;
  let teamId = new URLSearchParams(search).get('teamId');
  const chatRoomButton = <ChatRoomButton />;
  const backToRequestsTabButton =
    <DashboardButton
      // onClick={() => { announceMentorDeparture(teamId, mentorId) }}
      label={'بازگشت'}
      to={`/fsm/${fsmId}/manage/requests/`}
    />;
  const whiteboardButton = <WhiteboardButton />;
  const teamAvatar = <TeamAvatar />;
  const userAvatar = <UserAvatar />;

  const desktopLeftItems = [];
  const desktopRightItems = [];
  const mobileLeftItems = [];
  const mobileRightItems = [];
  const mobileMenuListItems = [];

  if (fsm?.fsm_p_type == 'Individual') {
    desktopRightItems.push(userAvatar);
  } else {
    desktopRightItems.push(teamAvatar);
  }
  desktopRightItems.push([chatRoomButton]);
  desktopLeftItems.push([whiteboardButton,]);
  desktopLeftItems.push([backToRequestsTabButton]);


  mobileRightItems.push([chatRoomButton]);
  mobileRightItems.push([whiteboardButton,]);

  mobileLeftItems.push(backToRequestsTabButton);

  return {
    desktopLeftItems,
    desktopRightItems,
    mobileLeftItems,
    mobileRightItems,
    mobileMenuListItems,
  };
};

export default MentorFSMAppbarItems;
