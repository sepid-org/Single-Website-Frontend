import React, { FC } from "react";
import { Box, IconButton, Paper, Typography } from "@mui/material";
import CloseIcon from "../../atoms/icons/Close";

type NoHintFoundPropsType = {
  onClose: any;
}

const NoHintFound: FC<NoHintFoundPropsType> = ({ onClose }) => {

  return (
    <Paper sx={{ padding: 8, position: 'relative' }}>
      <Box position={'absolute'} right={4} top={4}>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Typography variant="h5">
        {'راهنمایی‌ای وجود ندارد'}
      </Typography>
    </Paper>
  )
}

export default NoHintFound;