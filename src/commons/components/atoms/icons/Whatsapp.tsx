import React from 'react';
import WhatsappSVG from './Whatsapp.svg';
import { Box } from '@mui/material';

const WhatsappIcon = ({ size = 24 }) => {
  return (
    <Box
      component="img"
      src={WhatsappSVG}
      sx={{
        width: size,
      }}
    />
  );
};

export default WhatsappIcon;