import React from 'react';
import InstagramSVG from './instagram.svg';
import { Box } from '@mui/material';

const InstagramIcon = ({ size = 24 }) => {
  return (
    <Box
      component="img"
      src={InstagramSVG}
      sx={{
        width: size,
      }}
    />
  );
};

export default InstagramIcon;