import React from 'react';
import bananaSvg from "../../../assets/banana.svg";
import { Box } from '@mui/material';

const BananaIcon = (props) => {
  return (
    <Box
      component="img"
      src={bananaSvg}
      sx={{
        width: 21,
      }}
    />
  );
};

export default BananaIcon;