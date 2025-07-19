import React from 'react';
import GrayVerifySVG from "../../../assets/gray-verify.svg";
import { Box } from '@mui/material';

const GrayVerifyIcon = ({ size = 40 }) => {
  return (
    <Box
      component="img"
      src={GrayVerifySVG}
      sx={{
        width: size,
      }}
    />
  );
};

export default GrayVerifyIcon;