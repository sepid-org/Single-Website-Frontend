import React from 'react';
import hintsSvg from "../../../assets/hints.svg";
import { Box } from '@mui/material';

const HintsIcon = (props) => {
  return (
    <Box
      component="img"
      src={hintsSvg}
      sx={{
        width: 100,
      }}
    />
  );
};

export default HintsIcon;