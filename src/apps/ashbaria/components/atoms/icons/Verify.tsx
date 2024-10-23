import React from 'react';
import verify from "../../../assets/verify.svg";
import { Box } from '@mui/material';

const VerifyIcon = ({ size = 34 }) => {
  return (
    <Box
      component="img"
      src={verify}
      sx={{
        width: size,
      }}
    />
  );
};

export default VerifyIcon;