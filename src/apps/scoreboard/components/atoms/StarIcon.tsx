import React from "react";
import starIcon from "../../assets/starIcon.svg";
import { Box } from "@mui/material";

const StarIcon = ({ size = 28 }) => {
  return (
    <Box
      component="img"
      src={starIcon}
      width={size}
      height={size}
    />
  );
}

export default StarIcon;