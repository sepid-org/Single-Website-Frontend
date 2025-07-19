import React from 'react';
import hintsSvg from "../../../assets/hints.svg";
import { Box } from '@mui/material';

const HintsIcon = ({ size = 90 }) => {
  return (
    <Box
      component="img"
      src={hintsSvg}
      sx={{
        width: size,
      }}
    />
  );
};

export default HintsIcon;