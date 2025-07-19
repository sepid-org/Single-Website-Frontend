import React, { FC, Fragment, useState } from 'react';
import { Button, Dialog, DialogContent } from '@mui/material';
import Paper from 'commons/template/Paper';

type PropsType = {
  helpPaperId: number;
}

const GameHelpButton: FC<PropsType> = ({ helpPaperId }) => {
  const [openHelpDialog, setOpenHelpDialog] = useState(false);

  if (!helpPaperId) {
    return;
  }

  return (
    <Fragment>
      <Button fullWidth variant='contained' onClick={() => setOpenHelpDialog(true)}>
        {'راهنمای بازی'}
      </Button>
      <Dialog
        fullWidth
        maxWidth='sm'
        open={openHelpDialog}
        onClose={() => setOpenHelpDialog(false)}
        disableScrollLock
      >
        <DialogContent>
          <Paper mode='general' paperId={helpPaperId.toString()} />
        </DialogContent>
      </Dialog>
    </Fragment >
  );
};

export default GameHelpButton;