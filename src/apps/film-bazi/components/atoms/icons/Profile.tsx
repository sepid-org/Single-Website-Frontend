import React from 'react';
import ProfileSvg from "../../../assets/profile.svg";
import { Box } from '@mui/material';

const ProfileIcon = ({ width = 40 }) => {
  return (
    <Box
      component="img"
      src={ProfileSvg}
      sx={{
        width,
      }}
    />
  );
};

export default ProfileIcon;