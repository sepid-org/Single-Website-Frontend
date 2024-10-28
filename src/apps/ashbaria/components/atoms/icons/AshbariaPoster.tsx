import React from 'react';
import AshbariaPosterImage from "../../../assets/Ashbaria-poster.jpg";
import { Box } from '@mui/material';

const AshbariaPoster = ({ width = 40 }) => {
  return (
    <Box
      component="img"
      src={AshbariaPosterImage}
      sx={{
        width,
        height: "auto",
      }}
    />
  );
};

export default AshbariaPoster;
