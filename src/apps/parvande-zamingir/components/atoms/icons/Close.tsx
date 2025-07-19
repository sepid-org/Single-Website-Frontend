import React from 'react';
import CloseSVG from "../../../assets/close-circle.svg";
import { Box } from '@mui/material';

const CloseIcon = ({ width = 30, height = 30 }) => {
  return (
    <Box
      component="img"
      src={CloseSVG}
      width={width}
      height={height}
    />
  );
};

export default CloseIcon;