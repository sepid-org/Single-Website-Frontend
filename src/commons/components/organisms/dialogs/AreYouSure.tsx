import {
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Typography,
} from '@mui/material';
import React from 'react';

function AreYouSure({ open, handleClose, callBackFunction, text = '' }) {
  return (
    <Dialog disableScrollLock maxWidth="xs" open={open} onClose={handleClose}>
      <DialogContent>
        <Grid item>
          <Typography variant="h5" align="center">
            {text || 'آیا مطمئن هستید؟'}
          </Typography>
        </Grid>
      </DialogContent>
      <DialogActions>
        <ButtonGroup variant="contained" color="primary" fullWidth>
          <Button
            onClick={(e) => {
              callBackFunction(e);
              handleClose(e);
            }}>
            بله
          </Button>
          <Button onClick={handleClose}>انصراف</Button>
        </ButtonGroup>
      </DialogActions>
    </Dialog>
  );
}

export default AreYouSure;
