import { Grid } from "@mui/material";
import CourseMapEditorProvider from "commons/components/organisms/Roadmap/CourseMapEditorProvider";
import React, { useEffect, useState } from "react";
import { useGetFSMQuery, useSetFSMFirstStateMutation } from "../redux/slices/fsm/FSMSlice";
import { toast } from "react-toastify";
import FSMFirstStateSetter from "../components/organisms/FSMFirstStateSetter";
import { useFSMContext } from "commons/hooks/useFSMContext";

const FSMMapEditor = () => {
  const { fsmId } = useFSMContext();
  const { data: fsm } = useGetFSMQuery({ fsmId })
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
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FSMFirstStateSetter />
      </Grid>
      <Grid item xs={12}>
        <CourseMapEditorProvider />
      </Grid>
    </Grid>
  )
}

export default FSMMapEditor;