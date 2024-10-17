import { Button, FormControl, Grid, InputLabel, MenuItem, Select, Stack, Typography } from "@mui/material";
import CourseMapEditorProvider from "commons/components/organisms/Roadmap/CourseMapEditorProvider";
import React, { useEffect, useState } from "react";
import { useGetFSMQuery, useGetFSMStatesQuery, useSetFSMFirstStateMutation } from "../redux/slices/fsm/FSMSlice";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const FSMMapEditor = () => {
  const { fsmId } = useParams();
  const { data: fsm } = useGetFSMQuery({ fsmId })
  const { data: fsmStates } = useGetFSMStatesQuery({ fsmId })
  const [setFSMFirstState, result] = useSetFSMFirstStateMutation()
  const [firstState, setFirstState] = useState('')

  useEffect(() => {
    if (fsm?.first_state) {
      setFirstState(fsm.first_state);
    }
  }, [fsm])

  useEffect(() => {
    if (result.isSuccess) {
      toast.success('گام آغازین با موفقیت تغییر تعیین شد.')
    }
  }, [result])

  const handleSetFSMFirstState = () => {
    setFSMFirstState({
      fsmId,
      fsmStateId: firstState,
    });
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <Stack direction={'row'}>
          <FormControl fullWidth>
            <InputLabel>گام آغازین</InputLabel>
            <Select
              sx={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
              value={firstState || ''}
              onChange={(e) => setFirstState(e.target.value)}
              name="first_state"
              label="گام آغازین">
              {fsmStates?.map((fsmState) => (
                <MenuItem key={fsmState.id} value={fsmState.id}>
                  {fsmState.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            disableElevation
            sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
            variant='contained' onClick={handleSetFSMFirstState}>
            {'ذخیره'}
          </Button>
        </Stack>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant='caption'>
          {'توجه کنید که با تغییر گام آغازین کارگاه، گامِ فعلیِ کاربرانی که پیش از این وارد کارگاه شده‌اند، تغییر نخواهد کرد.'}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <CourseMapEditorProvider />
      </Grid>
    </Grid>
  )
}

export default FSMMapEditor;