import React from 'react';
import BaleSVG from './bale.svg';
import { Box } from '@mui/material';

const BaleIcon = ({ size = 24 }) => {
  return (
    <Box
      component="img"
      src={BaleSVG}
      sx={{
        width: size,
      }}
    />
  );
};

export default BaleIcon;