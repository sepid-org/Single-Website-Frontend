import React, { useState, useEffect, FC, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

type OpenDialogPropsType = {
  image?: string;
  title?: string;
  message: string;
  onClose?: any;
} | { component: any };


// Global dialog handler references, initialized when DialogProvider mounts
const dialogService = {
  open: (props: OpenDialogPropsType) => { },
  close: () => { },
};

// DialogProvider component to wrap your app
interface DialogProviderPropsType { }

export const DialogProvider: FC<DialogProviderPropsType> = ({ }) => {
  const [dialogState, setDialogState] = useState<any>({
    open: false,
    image: '',
    message: '',
    title: '',
    component: null,
    onClose: () => { }
  });

  const openDialog = (openDialogProps: OpenDialogPropsType) => {
    setDialogState(dialogState => ({ ...openDialogProps, open: true }));
  };

  const closeDialog = () => {
    dialogState.onClose?.();
    setDialogState(dialogState => ({ ...dialogState, open: false }));
  };

  // Set dialog service functions after the component mounts
  useEffect(() => {
    dialogService.open = openDialog;
    dialogService.close = closeDialog;
  }, []);

  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Dialog
          open={dialogState.open}
          onClose={closeDialog}
          PaperProps={{
            style: dialogState?.component ?
              {
                overflow: 'hidden',
                backgroundColor: 'transparent',
                boxShadow: 'none',
              } :
              null,
          }}>
          {dialogState?.component ?
            dialogState.component :
            <Fragment>
              <DialogTitle>{dialogState.title}</DialogTitle>
              <DialogContent>{dialogState.message}</DialogContent>
              <DialogActions>
                <Button onClick={closeDialog}>{'متوجه شدم'}</Button>
              </DialogActions>
            </Fragment>
          }
        </Dialog>,
        document.body
      )}
    </Fragment>
  );
};

export default dialogService;
