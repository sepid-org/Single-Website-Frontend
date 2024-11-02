import {
  Badge,
  IconButton,
  Popover,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
} from '@mui/icons-material';
import React, { FC, Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import { fakeNotifications } from 'apps/chat/fakeNotifications';
import NotificationsList from '../organisms/NotificationsList';
import useWebSocket from '../../hooks/useWebsocket';
import { useGetUserProfileSummaryQuery, useGetWebsiteProfileSummaryQuery } from 'commons/redux/apis/party/ProfileSlice';

type NotificationButtonPropsType = {
}

const NotificationButton: FC<NotificationButtonPropsType> = ({
}) => {
  const t = useTranslate();
  const { data: website } = useGetWebsiteProfileSummaryQuery({});
  const userInfo = useSelector((state: any) => state.account.userInfo);
  const { data: userProfileSummary } = useGetUserProfileSummaryQuery({ userId: userInfo?.id }, { skip: !userInfo?.id });
  const room = (website?.name && userProfileSummary?.id) ? `sepid-${website.name}-${userProfileSummary?.id}` : null;
  // const sendMessage = useWebSocket({ room });
  const [message, setMessage] = useState('');
  const messages = useSelector((state: any) => state.websocket.messages);
  const status = useSelector((state: any) => state.websocket.status);


  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const unSeenNotifications = fakeNotifications.filter(notification => !notification.seen);

  return (
    <Fragment>
      <IconButton onClick={handlePopoverOpen} size='small' disableRipple>
        <Badge badgeContent={unSeenNotifications.length}
          sx={() => ({
            '& .MuiBadge-badge': {
              background: '#00a1c9',
              color: 'white',
            },
          })}>
          <NotificationsIcon fontSize='large' />
        </Badge>
      </IconButton>
      <Popover
        disableScrollLock
        open={Boolean(anchorEl)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        disableRestoreFocus
        marginThreshold={30}>
        <NotificationsList notifications={unSeenNotifications} />
      </Popover >
    </Fragment>
  );
};

export default NotificationButton;

