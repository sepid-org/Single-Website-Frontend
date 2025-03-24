import React from "react";
import goldenStarIcon from "../../assets/filledStarIcon.svg";
import { Box } from "@mui/material";

const GoldenStarIcon = ({ size = 28 }) => {
  return (
    <Box
      component="img"
      src={goldenStarIcon}
      width={size}
      height={size}
    />
  );
}

export default GoldenStarIcon;