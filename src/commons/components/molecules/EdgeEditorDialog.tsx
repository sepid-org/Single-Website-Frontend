import { Button, Container, Dialog, DialogContent, FormControl, FormControlLabel, Grid, IconButton, InputLabel, MenuItem, Select, Stack, Switch, Tooltip, Typography } from "@mui/material";
import { useCreateFSMEdgeMutation, useDeleteFSMEdgeMutation, useGetFSMEdgeQuery, useUpdateFSMEdgeMutation } from "apps/fsm/redux/slices/fsm/EdgeSlice";
import { FSMEdgeType } from "commons/types/models";
import React, { FC, Fragment, useEffect, useState } from "react";
import AreYouSure from "../organisms/dialogs/AreYouSure";
import { Delete as DeleteIcon } from '@mui/icons-material';
import { useGetFSMStatesQuery } from "apps/fsm/redux/slices/fsm/FSMSlice";
import { useParams } from "react-router-dom";

type EdgeEditorDialogPropsType = {
  id: string;
  open: boolean
  onClose: any;
}

const EdgeEditorDialog: FC<EdgeEditorDialogPropsType> = ({
  id,
  open,
  onClose,
}) => {
  const fsmId = parseInt(useParams().fsmId);
  const { data: initialEdge } = useGetFSMEdgeQuery({ edgeId: id }, { skip: !Boolean(id) || !Boolean(open) });
  const [createFSMEdge, createFSMEdgeResult] = useCreateFSMEdgeMutation();
  const [updateFSMEdge, updateFSMEdgeResult] = useUpdateFSMEdgeMutation();
  const [deleteFSMEdge, deleteFSMEdgeResult] = useDeleteFSMEdgeMutation();
  const [edge, setEdge] = useState<FSMEdgeType>(null);
  const [openDeleteWidgetDialog, setOpenDeleteWidgetDialog] = useState(false);
  const { data: fsmStates = [] } = useGetFSMStatesQuery({ fsmId });

  useEffect(() => {
    if (createFSMEdgeResult.isSuccess) {
      onClose();
    }
  }, [createFSMEdgeResult])

  useEffect(() => {
    if (updateFSMEdgeResult.isSuccess) {
      onClose();
    }
  }, [updateFSMEdgeResult])

  useEffect(() => {
    if (deleteFSMEdgeResult.isSuccess) {
      onClose();
    }
  }, [deleteFSMEdgeResult])

  useEffect(() => {
    if (initialEdge) {
      setEdge(initialEdge);
    }
  }, [initialEdge])

  const handleSubmit = () => {
    if (edge.id) {
      updateFSMEdge({
        fsmEdgeId: edge.id,
        ...edge,
      })
    } else {
      createFSMEdge({
        ...edge
      })
    }
  }

  const toggleValue = (name: string) => {
    setEdge(properties => ({
      ...properties,
      [name]: !properties[name],
    }));
  }

  return (
    <Fragment>
      <Dialog
        disableScrollLock
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth='sm'
      >
        <DialogContent>
          <Grid container spacing={2}>
            <Grid container item xs={12} justifyContent={'space-between'}>
              <Grid item xs={12} sm='auto'>
                <Typography variant='h2' gutterBottom>
                  {'مشخصات یال'}
                </Typography>
              </Grid>
              <Grid item xs={12} sm='auto'>
                <Stack direction={'row'}>
                  <Tooltip title='حذف یال' arrow>
                    <IconButton color='error' onClick={() => setOpenDeleteWidgetDialog(true)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                  <Button fullWidth variant='contained' onClick={handleSubmit}>
                    {'ذخیره'}
                  </Button>
                </Stack>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size='small' variant="outlined">
                <InputLabel>شروع</InputLabel>
                <Select
                  value={edge?.tail}
                  onChange={(e) => {
                    setEdge({
                      ...edge,
                      tail: e.target.value,
                    })
                  }}
                  label='شروع'>
                  {fsmStates.map((state) => (
                    <MenuItem key={state.id} value={state.id}>{state.title}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size='small' variant="outlined">
                <InputLabel>پایان</InputLabel>
                <Select
                  value={edge?.head}
                  onChange={(e) => {
                    setEdge({
                      ...edge,
                      head: e.target.value,
                    })
                  }}
                  label='پایان'>
                  {fsmStates.map((state) => (
                    <MenuItem key={state.id} value={state.id}>{state.title}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                name='is_visible'
                checked={edge?.is_visible}
                onChange={() => toggleValue('is_visible')}
                control={<Switch color="primary" />}
                label="یال برای شرکت‌کنندگان قابل مشاهده باشد:"
                labelPlacement='start'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                name='is_back_enabled'
                checked={edge?.is_back_enabled}
                onChange={() => toggleValue('is_back_enabled')}
                control={<Switch color="primary" />}
                label="آیا بازگشت به‌عقب از طریق این یال ممکن است؟:"
                labelPlacement='start'
              />
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
      <AreYouSure
        text={'آیا از حذف یال مطمئن هستید؟'}
        open={openDeleteWidgetDialog}
        handleClose={() => setOpenDeleteWidgetDialog(false)}
        callBackFunction={() => deleteFSMEdge({ fsmEdgeId: id })}
      />
    </Fragment >
  )
}

export default EdgeEditorDialog;