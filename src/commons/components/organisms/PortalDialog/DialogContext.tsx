import React, { useState, useEffect, FC, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

type OpenDialogPropsType = {
  title?: string;
  message: string;
  component?: any;
  onClose?: any;
}

// Global dialog handler references, initialized when DialogProvider mounts
const dialogService = {
  open: (props: OpenDialogPropsType) => { },
  close: () => { },
};

// DialogProvider component to wrap your app
interface DialogProviderPropsType { }

export const DialogProvider: FC<DialogProviderPropsType> = ({ }) => {
  const [dialogState, setDialogState] = useState({
    open: false,
    message: '',
    title: '',
    component: null,
    onClose: () => { }
  });

  const openDialog = ({ message, title, component, onClose }: OpenDialogPropsType) => {
    setDialogState(dialogState => ({ ...dialogState, open: true, message, title, component, onClose }));
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
        <Dialog open={dialogState.open} onClose={closeDialog}>
          <DialogTitle>{dialogState.title}</DialogTitle>
          <DialogContent>{dialogState.message}</DialogContent>
          <DialogActions>
            <Button onClick={closeDialog}>{'متوجه شدم'}</Button>
          </DialogActions>
        </Dialog >,
        document.body
      )}
    </Fragment>
  );
};

export default dialogService;
