import { IconButton, Stack, Typography, Paper, TextField, Button, ButtonGroup, Box } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { toEnglishNumber, toPersianNumber } from "commons/utils/translateNumber";
import { useAddPaperToFSMStateMutation, useCreateAndAddPaperToFSMStateMutation } from "apps/fsm/redux/slices/fsm/FSMStateSlice";

type AddPaperToFSMStatePropsType = {
  fsmStateId: string;
}

const AddPaperToFSMState: FC<AddPaperToFSMStatePropsType> = ({ fsmStateId }) => {
  const [paperId, setPaperId] = useState<string>('');
  const [addPaperToFSMState, result] = useAddPaperToFSMStateMutation();
  const [createAndAddPaperToFSMState, createAndAddPaperToFSMStateResult] = useCreateAndAddPaperToFSMStateMutation();

  const handleAddPaperToFSMState = () => {
    if (!paperId) {
      return;
    }
    createAndAddPaperToFSMState({
      fsmStateId,
    })
  }

  const handleCreateAndAddPaperToFSMState = () => {
    if (paperId) {
      addPaperToFSMState({
        fsmStateId,
        paperId: toEnglishNumber(paperId),
      })
    } else {
      createAndAddPaperToFSMState({
        fsmStateId,
      })
    }
  }

  useEffect(() => {
    if (result.isSuccess) {
      setPaperId('');
    }
  }, [result])

  return (
    <Stack direction={'row'} justifyItems={'stretch'} alignContent={'stretch'} alignItems={'stretch'} justifyContent={'stretch'} spacing={1} padding={1}>
      <Stack direction={'row'}>
        <TextField
          size="small"
          fullWidth
          label="شماره برگه"
          InputProps={{
            sx: {
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
            }
          }}
          value={paperId}
          onChange={(e) => setPaperId(e.target.value)}
        />
        <Button
          disableElevation
          disabled={!paperId}
          variant="contained"
          onClick={handleAddPaperToFSMState}
          sx={{
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
          }}
        >
          {'افزودن'}
        </Button>
      </Stack>
      <Button variant='contained' onClick={handleCreateAndAddPaperToFSMState}>
        {'جدید'}
      </Button>
    </Stack>
  )
}

export default AddPaperToFSMState;