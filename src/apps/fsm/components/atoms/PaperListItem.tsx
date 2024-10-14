import { IconButton, Stack, Typography, Paper } from "@mui/material";
import React, { FC } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { toPersianNumber } from "commons/utils/translateNumber";

type PaperListItemPropsType = {
  paperId: string;
  handleRemovePaperFromFSMState: any;
  isSelected: boolean;
}

const PaperListItem: FC<PaperListItemPropsType> = ({ paperId, handleRemovePaperFromFSMState, isSelected = false }) => {
  return (
    <Paper
      elevation={isSelected ? 4 : 1}
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