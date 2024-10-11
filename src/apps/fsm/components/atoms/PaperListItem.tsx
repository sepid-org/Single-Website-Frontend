import { IconButton, Stack, Typography, Paper } from "@mui/material";
import React, { FC } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { toPersianNumber } from "commons/utils/translateNumber";

type PaperListItemPropsType = {
  paperId: string;
  handleRemovePaperFromFSMState: any;
}

const PaperListItem: FC<PaperListItemPropsType> = ({ paperId, handleRemovePaperFromFSMState }) => {
  return (
    <Paper
      elevation={1}
      sx={{
        borderRadius: 2,
        padding: 1,
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography>{`لایه شماره ${toPersianNumber(paperId)}`}</Typography>
        <IconButton onClick={handleRemovePaperFromFSMState}>
          <DeleteIcon />
        </IconButton>
      </Stack>
    </Paper>
  )
}

export default PaperListItem;