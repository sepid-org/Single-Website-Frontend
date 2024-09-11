import React from 'react';
import { Dialog, Paper } from '@mui/material';

const PaperDialog = ({ open, onClose, children }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      fullWidth
      PaperComponent={Paper}
      PaperProps={{
        sx: {
          maxWidth: '1600px',
        },
      }}
    >
      <div style={{
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
        overflow: 'auto',
      }}>
        {children}
      </div>
    </Dialog>
  );
};

export default PaperDialog;