import React from 'react';
import ArrowLeftSVG from "../../../assets/arrow-left.svg";
import { Box } from '@mui/material';

const ArrowLeftIcon = ({ width = 40 }) => {
  return (
    <Box
      component="img"
      src={ArrowLeftSVG}
      sx={{
        width,
      }}
    />
  );
};

export default ArrowLeftIcon;