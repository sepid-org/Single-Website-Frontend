import React from 'react';
import RankingSvg from "../../../assets/ranking.svg";
import { Box } from '@mui/material';

const RankingIcon = ({ width = 21 }) => {
  return (
    <Box
      component="img"
      src={RankingSvg}
      sx={{
        width,
      }}
    />
  );
};

export default RankingIcon;