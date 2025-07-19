import React from 'react';
import DislikeSVG from "../../../assets/dislike.svg";
import { Box } from '@mui/material';

const DislikeIcon = ({ size = 34 }) => {
  return (
    <Box
      component="img"
      src={DislikeSVG}
      sx={{
        width: size,
      }}
    />
  );
};

export default DislikeIcon;