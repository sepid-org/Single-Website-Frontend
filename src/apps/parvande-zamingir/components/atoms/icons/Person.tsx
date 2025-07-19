import React from 'react';
import ProfileSVG from "../../../assets/profile.svg";
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