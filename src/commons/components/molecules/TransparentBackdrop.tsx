import React from 'react';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const TransparentBackdrop = ({ open }) => {
  return (
    <Backdrop
      open={open}
      sx={{
        backgroundColor: 'transparent',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

export default TransparentBackdrop;