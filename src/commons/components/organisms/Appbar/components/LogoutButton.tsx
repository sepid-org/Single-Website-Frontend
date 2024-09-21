import { Button, Icon, Typography } from '@mui/material';
import React from 'react';
import useLogout from 'commons/hooks/useLogout';

function LogoutButton({ }) {
  const { logout } = useLogout();
  return (
    <Button
      variant="outlined"
      onClick={logout}
      endIcon={
        <Icon>
          <img
            src={`${process.env.PUBLIC_URL}/icons/logout.png`}
            alt=''
            style={{
              maxHeight: '20px',
              width: '100%',
            }}
          />
        </Icon>
      }>
      <Typography variant="caption">خروج</Typography>
    </Button>
  );
}

export default LogoutButton;