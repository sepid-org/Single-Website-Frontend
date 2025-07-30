import { Stack } from '@mui/material';
import React from 'react';
import Avatar from './UserAvatar';
import DashboardButton from './DashboardButton';
import useUserAuthentication from 'commons/hooks/useUserAuthentication';

const UserInfo = ({ }) => {
  const { isUserAuthenticated } = useUserAuthentication();

  return (
    <Stack direction={'row'} alignItems={'center'} justifyContent={'center'}>
      {isUserAuthenticated ?
        <Avatar /> :
        <Stack direction={'row'} spacing={1}>
          <DashboardButton variant='contained' label='ورود' to={'/auth/'} onClick={null} />
        </Stack>
      }
    </Stack>
  )
}

export default UserInfo;
