import React from 'react';
import MoneySvg from "../../../assets/money.svg";
import { Box } from '@mui/material';

const MoneyIcon = ({ width = 24 }) => {
  return (
    <Box
      component="img"
      src={MoneySvg}
      sx={{
        width,
      }}
    />
  );
};

export default MoneyIcon;