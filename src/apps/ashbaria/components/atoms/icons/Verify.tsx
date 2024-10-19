import React from 'react';
import verify from "../../../assets/verify.svg";
import { Box } from '@mui/material';

const VerifyIcon = (props) => {
  return (
    <Box
      component="img"
      src={verify}
      sx={{
        width: 34,
      }}
    />
  );
};

export default VerifyIcon;