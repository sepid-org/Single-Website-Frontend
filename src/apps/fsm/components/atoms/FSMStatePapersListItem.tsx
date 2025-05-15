import { IconButton, Stack, Typography, Paper } from "@mui/material";
import React, { FC, Fragment, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { toPersianNumber } from "commons/utils/translateNumber";
import { useDuplicateAndAddPaperToFSMStateMutation, useRemovePaperFromFSMStateMutation } from "apps/fsm/redux/slices/fsm/FSMStateSlice";
import AreYouSure from "commons/components/organisms/dialogs/AreYouSure";

type PaperListItemPropsType = {
  paperId: string;
  fsmStateId: string;
  isSelected: boolean;
}

const FSMStatePapersListItem: FC<PaperListItemPropsType> = ({
  paperId,
  fsmStateId,
  isSelected = false,
}) => {
  const [openRemovePaperDialog, setOpenRemovePaperDialog] = useState(false);
  const [removePaperFromFSMState] = useRemovePaperFromFSMStateMutation();
  const [duplicateAndAddPaperToFSMState] = useDuplicateAndAddPaperToFSMStateMutation();

  const handleRemovePaperFromFSMState = () => {
    if (openRemovePaperDialog) {
      removePaperFromFSMState({ paperId, fsmStateId });
      setOpenRemovePaperDialog(false);
    }
  };

  const handleDuplicatePaperFromFSMState = (e) => {
    e.stopPropagation();
    duplicateAndAddPaperToFSMState({ paperId, fsmStateId });
  };

  // Open the dialog for a specific paper
  const handleOpenRemovePaperDialog = (e) => {
    e.stopPropagation();
    setOpenRemovePaperDialog(true);
  };

  // Close dialog
  const handleCloseRemovePaperDialog = (e) => {
    e.stopPropagation();
    setOpenRemovePaperDialog(false);
  };

  return (
    <Fragment>
      <Paper
        sx={{
          border: isSelected ? 2 : null,
          paddingX: 1,
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant='caption'>{`برگه شماره ${toPersianNumber(paperId)}`}</Typography>
          <Stack direction={'row'}>
            <IconButton size='small' onClick={handleDuplicatePaperFromFSMState}>
              <ContentCopyIcon fontSize="small" />
            </IconButton>
            <IconButton size='small' onClick={handleOpenRemovePaperDialog}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Stack>
      </Paper>
      <AreYouSure
        open={openRemovePaperDialog}
        handleClose={handleCloseRemovePaperDialog}
        callBackFunction={handleRemovePaperFromFSMState}
      />
    </Fragment>
  )
}

export default FSMStatePapersListItem;