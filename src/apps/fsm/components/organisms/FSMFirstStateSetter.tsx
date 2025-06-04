import { Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useGetFSMQuery, useGetFSMStatesQuery, useSetFSMFirstStateMutation } from "../../redux/slices/fsm/FSMSlice";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const FSMFirstStateSetter = () => {
  const fsmId = parseInt(useParams().fsmId);
  const { data: fsm } = useGetFSMQuery({ fsmId })
  const { data: fsmStates } = useGetFSMStatesQuery({ fsmId })
  const [setFSMFirstState, result] = useSetFSMFirstStateMutation()
  const [firstState, setFirstState] = useState('')

  useEffect(() => {
    if (fsm?.first_state_id) {
      setFirstState(fsm.first_state_id);
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
    <Stack>
      <Stack direction={'row'}>
        <FormControl>
          <InputLabel>گام آغازین</InputLabel>
          <Select
            sx={{ borderTopRightRadius: 0, borderBottomRightRadius: 0, width: 300 }}
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
      <FormHelperText>
        {'توجه کنید که با تغییر گام آغازین کارگاه، گامِ فعلیِ کاربرانی که پیش از این وارد کارگاه شده‌اند، تغییر نخواهد کرد.'}
      </FormHelperText>
    </Stack>
  )
}

export default FSMFirstStateSetter;