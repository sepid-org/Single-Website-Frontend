import React from 'react';
import ShadSVG from './shad.svg';
import { Box } from '@mui/material';

const ShadIcon = ({ size = 24 }) => {
  return (
    <Box
      component="img"
      src={ShadSVG}
      sx={{
        width: size,
        borderRadius: 1,
      }}
    />
  );
};

export default ShadIcon;