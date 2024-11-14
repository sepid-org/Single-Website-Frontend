import { Button, Dialog, DialogContent, Stack, Typography } from '@mui/material';
import React, { FC, Fragment, useState } from 'react';

import InfoIcon from '../../atoms/icons/Info';
import Paper from 'commons/template/Paper';
import { useParams } from 'react-router-dom';
import { useGetProgramQuery } from 'apps/website-display/redux/features/program/ProgramSlice';

type PropsType = {}

const HelpButton: FC<PropsType> = () => {
  const { programSlug } = useParams();
  const { data: program } = useGetProgramQuery({ programSlug });
  const [openHelpDialog, setOpenHelpDialog] = useState(false);

  if (!program?.site_help_paper_id) {
    return;
  }

  return (
    <Fragment>
      <Button
        sx={{ background: '#00000066' }}
        fullWidth variant='contained'
        onClick={() => setOpenHelpDialog(true)}
      >
        <Stack spacing={0.5} alignItems={'center'} justifyContent={'center'} direction={'row'}>
          <InfoIcon />
          <Typography fontWeight={600} fontSize={18} color={'white'}>
            {'راهنمای بازی'}
          </Typography>
        </Stack>
      </Button>
      <Dialog
        fullWidth
        maxWidth='sm'
        open={openHelpDialog}
        onClose={() => setOpenHelpDialog(false)}
        disableScrollLock
      >
        <DialogContent>
          <Paper mode='general' paperId={program.site_help_paper_id} />
        </DialogContent>
      </Dialog>
    </Fragment>

  );
}

export default HelpButton;
