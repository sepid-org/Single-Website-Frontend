import React from 'react';
import ArrowRightSVG from "../../../assets/arrow-right.svg";
import { Box } from '@mui/material';

const ArrowRightIcon = ({ width = 40 }) => {
  return (
    <Box
      component="img"
      src={ArrowRightSVG}
      sx={{
        width,
      }}
    />
  );
};

export default ArrowRightIcon;