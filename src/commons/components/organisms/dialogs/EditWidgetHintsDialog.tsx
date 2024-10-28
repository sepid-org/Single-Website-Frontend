import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import React from 'react';
import HintsEditor from 'commons/components/organisms/hint/HintsEditor';
import { DialogTitle } from '@mui/material';

const EditWidgetHintsDialog = ({
  handleClose,
  open,
  referenceId,
}) => {

  return (
    <Dialog disableScrollLock open={open} onClose={handleClose} fullWidth>
      <DialogTitle>{'راهنمایی‌ها'}</DialogTitle>
      <DialogContent>
        <HintsEditor referenceId={referenceId} type='widget' />
      </DialogContent>
    </Dialog>
  );
}

export default EditWidgetHintsDialog;
