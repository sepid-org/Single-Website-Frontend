import React from 'react';
import LikeSVG from "../../../assets/like.svg";
import { Box } from '@mui/material';

const LikeIcon = ({ size = 34 }) => {
  return (
    <Box
      component="img"
      src={LikeSVG}
      sx={{
        width: size,
      }}
    />
  );
};

export default LikeIcon;