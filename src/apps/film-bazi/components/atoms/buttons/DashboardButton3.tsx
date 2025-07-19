import React from 'react';
import { Button, Typography } from '@mui/material';
import { styled } from '@mui/system';

const StyledButton = styled(Button)({
  background: 'linear-gradient(360deg, rgba(255, 255, 255, 0.01) 0%, rgba(255, 255, 255, 0.05) 100%)',
  borderBottom: '2px solid #FFFFFF33',
  boxShadow: '0px 4px 4px 0px #00000040',
  padding: 12,
  borderRadius: 20,
  border: '0px 0px 2px 0px',
});

const DashboardButton3 = ({ label = 'کلیک کن', icon = null, onClick = () => { } }) => {
  return (
    <StyledButton startIcon={icon} onClick={onClick}>
      <Typography fontWeight={700} fontSize={16}>
        {label}
      </Typography>
    </StyledButton>
  );
};

export default DashboardButton3;