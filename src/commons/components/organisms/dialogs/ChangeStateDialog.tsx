import {
  Dialog,
  DialogTitle,
  List,
  ListItemButton,
  Typography,
} from '@mui/material';
import useChangeState from 'commons/hooks/useChangeState';
import React from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';

function ChangeStateDialog({ open, handleClose, edges }) {
  const t = useTranslate();
  const { changeState } = useChangeState();

  return (
    <Dialog disableScrollLock open={open} onClose={handleClose}>
      <DialogTitle variant='h3'>{t('chooseNextState')}</DialogTitle>
      <List>
        {edges.slice().sort((e1, e2) => e1.head.title < e2.head.title ? 1 : -1).map((edge) => (
          <ListItemButton
            onClick={() => {
              changeState(edge);
              handleClose();
            }}
            key={edge.id}>
            {edge.head.title}
          </ListItemButton>
        ))}
      </List>
    </Dialog>
  );
}

export default ChangeStateDialog;
