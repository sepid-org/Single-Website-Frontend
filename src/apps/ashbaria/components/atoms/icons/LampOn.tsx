import React from 'react';
import lampOn from "../../../assets/lamp-on.svg";
import { Box } from '@mui/material';

const LampOnIcon = (props) => {
  return (
    <Box
      component="img"
      src={lampOn}
      sx={{
        width: 28,
      }}
    />
  );
};

export default LampOnIcon;