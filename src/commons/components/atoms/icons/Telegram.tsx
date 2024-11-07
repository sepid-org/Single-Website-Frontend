import React from 'react';
import TelegramSVG from './telegram.svg';
import { Box } from '@mui/material';

const TelegramIcon = ({ size = 24 }) => {
  return (
    <Box
      component="img"
      src={TelegramSVG}
      sx={{
        width: size,
      }}
    />
  );
};

export default TelegramIcon;