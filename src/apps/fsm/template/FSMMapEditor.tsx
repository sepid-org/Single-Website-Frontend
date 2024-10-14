import { Button, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from "@mui/material";
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
  const [firstState, setFirstState] = useState<string>('')

  useEffect(() => {
    if (fsm) {
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
        <FormControl fullWidth>
          <InputLabel>گام آغازین</InputLabel>
          <Select
            value={firstState}
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
      </Grid>
      <Grid item xs={12} sm={6}>
        <Button variant='contained' fullWidth onClick={handleSetFSMFirstState}>
          {'ذخیره'}
        </Button>
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