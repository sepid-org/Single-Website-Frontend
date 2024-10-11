import { IconButton, Stack, Typography, Paper, TextField, Button } from "@mui/material";
import React, { FC, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { toPersianNumber } from "commons/utils/translateNumber";
import { useAddPaperToFSMStateMutation } from "apps/fsm/redux/slices/fsm/FSMStateSlice";

type AddPaperToFSMStatePropsType = {
  fsmStateId: string;
}

const AddPaperToFSMState: FC<AddPaperToFSMStatePropsType> = ({ fsmStateId }) => {
  const [paperId, setPaperId] = useState<string>('');
  const [addPaperToFSMState, result] = useAddPaperToFSMStateMutation();

  const handleAddPaperToFSMState = () => {
    if (!paperId) {
      return;
    }
    addPaperToFSMState({
      fsmStateId,
      paperId,
    })
  }

  return (
    <Stack direction={'row'} spacing={1} padding={1}>
      <TextField
        size='small'
        fullWidth
        label='شماره لایه'
        onChange={(e) => setPaperId(e.target.value)}
      />
      <Button variant='contained' onClick={handleAddPaperToFSMState}>
        {'افزودن'}
      </Button>
    </Stack>
  )
}

export default AddPaperToFSMState;