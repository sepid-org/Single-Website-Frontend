import React from 'react';
import bananaSvg from "../../../assets/banana.svg";
import { Box } from '@mui/material';

const BananaIcon = (props) => {
  return (
    <Box
      component="img"
      src={bananaSvg}
      sx={{
        width: "28px",
        height: "28px",
        marginRight: "10px"
      }}
    />
  );
};

export default BananaIcon;