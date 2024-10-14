import React, { FC, Fragment, useEffect, useState } from 'react';
import { useDeleteFSMStateMutation, useGetFSMStateQuery, useUpdateFSMStateMutation } from 'apps/fsm/redux/slices/fsm/FSMStateSlice';
import {
  Button,
  FormControlLabel,
  Stack,
  IconButton,
  TextField,
  Tooltip,
  Switch,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import { FSMStateType } from 'commons/types/models';
import { Delete as DeleteIcon } from '@mui/icons-material';
import AreYouSure from 'commons/components/organisms/dialogs/AreYouSure';
import { toast } from 'react-toastify';
import { useFSMStateContext } from 'commons/hooks/useFSMStateContext';

type StateInfoEditorPropsType = {}

const StateInfoEditor: FC<StateInfoEditorPropsType> = ({ }) => {
  const { fsmStateId } = useFSMStateContext();
  const { data: initialFsmState } = useGetFSMStateQuery({ fsmStateId });
  const [fsmState, setFsmState] = useState<FSMStateType>(null);
  const [updateFSMState, { isSuccess, isLoading }] = useUpdateFSMStateMutation();

  const [openDeleteWidgetDialog, setOpenDeleteWidgetDialog] = useState(false);
  const [deleteFSMState, { isLoading: isDeleteFSMStateLoading, isSuccess: isDeleteFSMStateSuccess }] = useDeleteFSMStateMutation();

  useEffect(() => {
    if (isDeleteFSMStateSuccess) {
      // todo: it's not clean to refresh the page after deleting state
      window.location.reload();
    }
  }, [isDeleteFSMStateLoading])

  useEffect(() => {
    if (initialFsmState) {
      setFsmState(initialFsmState);
    }
  }, [initialFsmState]);

  const handleUpdateFSMState = () => {
    if (!fsmState.title) {
      toast.error('عنوان گام نمی‌تواند خالی باشد.');
      return;
    }
    updateFSMState({
      fsmStateId,
      ...fsmState,
    })
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success('تغییرات با موفقیت ثبت شدند.');
    }
  }, [isSuccess])

  return (
    <Fragment>
      <Container sx={{ padding: 2 }}>
        <Grid container spacing={2}>
          <Grid container item xs={12} justifyContent={'space-between'} spacing={2}>
            <Grid item xs={12} sm='auto'>
              <Typography variant='h2'>
                {'مشخصات گام'}
              </Typography>
            </Grid>
            <Grid item xs={12} sm='auto'>
              <Stack direction={'row'}>
                <Tooltip title='حذف گام' arrow>
                  <IconButton color='error' onClick={() => setOpenDeleteWidgetDialog(true)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
                <Button fullWidth disabled={isLoading} variant='contained' onClick={handleUpdateFSMState}>
                  {'ذخیره'}
                </Button>
              </Stack>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              value={fsmState?.title || ''}
              label='عنوان گام'
              onChange={(e) => setFsmState(fsmState => ({
                ...fsmState,
                title: e.target.value,
              }))}
              fullWidth variant='outlined'
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>قالب گام</InputLabel>
              <Select
                onChange={(event) => {
                  setFsmState({
                    ...fsmState,
                    template: event.target.value as 'normal' | 'board',
                  });
                }}
                name="template"
                value={fsmState?.template || ''}
                label="قالب گام">
                <MenuItem value={'normal'}>
                  {'عادی'}
                </MenuItem>
                <MenuItem value={'board'}>
                  {'تخته'}
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              labelPlacement='start'
              label={'نمایش نوار ابزار بالای صفحه:'}
              control={
                <Switch
                  checked={fsmState?.show_appbar || false}
                  onChange={() => {
                    setFsmState({
                      ...fsmState,
                      show_appbar: !fsmState.show_appbar,
                    })
                  }}
                  color="primary"
                />
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              labelPlacement='start'
              label={'گام آخر:'}
              control={
                <Switch
                  checked={fsmState?.is_end || false}
                  onChange={() => {
                    setFsmState({
                      ...fsmState,
                      is_end: !fsmState.is_end,
                    })
                  }}
                  color="primary"
                />
              }
            />
          </Grid>
        </Grid>
      </Container>
      <AreYouSure
        text={'آیا از حذف گام مطمئن هستید؟ با حذف گام، تمام ویجت‌های آن نیز از بین می‌روند.'}
        open={openDeleteWidgetDialog}
        handleClose={() => setOpenDeleteWidgetDialog(false)}
        callBackFunction={() => deleteFSMState({ fsmStateId })}
      />
    </Fragment >
  );
};

export default StateInfoEditor;