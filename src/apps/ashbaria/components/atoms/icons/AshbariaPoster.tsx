import React from 'react';
import { Box } from '@mui/material';
import { MediaUrls } from 'apps/ashbaria/constants/mediaUrls';

const AshbariaPoster = ({ width = 40 }) => {
  return (
    <Box
      component="img"
      src={MediaUrls.ASHBARIA_POSTER}
      sx={{
        width,
        height: "auto",
      }}
    />
  );
};

export default AshbariaPoster;
