import { IconButton, Tooltip } from "@mui/material";
import React from "react";
import InfoIcon from '@mui/icons-material/Info';

const TooltipInfo = ({ title }) => {

  return (
    <Tooltip arrow title={title}>
      <IconButton sx={{ padding: 0 }}>
        <InfoIcon />
      </IconButton>
    </Tooltip>
  );
}

export default TooltipInfo;