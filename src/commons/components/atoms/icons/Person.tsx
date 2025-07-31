import React from 'react';
import ProfileSVG from "./profile.svg";
import { Box } from '@mui/material';

const PersonIcon = (props) => {
  return (
    <Box
      component="img"
      src={ProfileSVG}
      sx={{
        width: 40,
      }}
    />
  );
};

export default PersonIcon;