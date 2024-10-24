import React from 'react';
import ArrowRightSVG from "../../../assets/arrow-right.svg";
import { Box } from '@mui/material';

const ArrowRightIcon = (props) => {
  return (
    <Box
      component="img"
      src={ArrowRightSVG}
      sx={{
        width: 40,
      }}
    />
  );
};

export default ArrowRightIcon;