import React from 'react';
import { Box } from '@mui/material';
import { ImageUrls } from 'apps/ashbaria/constants/imageUrls';

const AshbariaPoster = ({ width = 40 }) => {
  return (
    <Box
      component="img"
      src={ImageUrls.ASHBARIA_POSTER}
      sx={{
        width,
        height: "auto",
      }}
    />
  );
};

export default AshbariaPoster;
