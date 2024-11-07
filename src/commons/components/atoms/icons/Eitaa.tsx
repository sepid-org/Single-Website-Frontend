import React from 'react';
import EitaaSVG from './eitaa.svg';
import { Box } from '@mui/material';

const EitaaIcon = ({ size = 24 }) => {
  return (
    <Box
      component="img"
      src={EitaaSVG}
      sx={{
        width: size,
      }}
    />
  );
};

export default EitaaIcon;