import { Box, Button, Dialog } from '@mui/material';
import Paper from 'commons/template/Paper';
import React, { FC, Fragment, useState } from 'react';

type ProgramPageDashboardButtonPropsType = {
  buttonLabel: string;
  paperId: string;
}

const ProgramPageDashboardButton: FC<ProgramPageDashboardButtonPropsType> = ({ buttonLabel, paperId }) => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <Fragment>
      <Button
        size='large'
        variant="contained"
        color='info'
        fullWidth
        onClick={() => setOpenDialog(true)}>
        {buttonLabel}
      </Button>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} disableScrollLock>
        <Box position={'relative'} width={{ xs: 300, sm: 400, md: 600 }} height={600} sx={{ overflowX: 'hidden' }}>
          <Paper mode='general' paperId={paperId} />
        </Box>
      </Dialog>
    </Fragment>
  );
};

export default ProgramPageDashboardButton;
