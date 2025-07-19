import React from 'react';
import GrayLikeSVG from "../../../assets/gray-like.svg";
import { Box } from '@mui/material';

const GrayLikeIcon = ({ size = 34 }) => {
  return (
    <Box
      component="img"
      src={GrayLikeSVG}
      sx={{
        width: size,
      }}
    />
  );
};

export default GrayLikeIcon;