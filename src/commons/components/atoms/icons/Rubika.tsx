import React from 'react';
import RubikaSVG from './rubika.svg';
import { Box } from '@mui/material';

const RubikaIcon = ({ size = 24 }) => {
  return (
    <Box
      component="img"
      src={RubikaSVG}
      sx={{
        width: size,
      }}
    />
  );
};

export default RubikaIcon;