import React, { Fragment, useState } from 'react';
import { Box, Button, Dialog, DialogContent, Typography } from '@mui/material';
import DashboardButton3 from './DashboardButton3';
import QuestionIcon from '../icons/HelpIcon';
import { useParams } from 'react-router-dom';
import { useGetProgramQuery } from 'apps/website-display/redux/features/program/ProgramSlice';
import Paper from 'commons/template/Paper';

const HelpButton2 = ({ }) => {
  const { programSlug } = useParams();
  const { data: program } = useGetProgramQuery({ programSlug });
  const [openHelpDialog, setOpenHelpDialog] = useState(false);

  return (
    <Fragment>
      <Button startIcon={<QuestionIcon />} onClick={() => setOpenHelpDialog(true)}>
        <Typography fontWeight={700} fontSize={18}>
          {'راهنما'}
        </Typography>
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
    </Fragment >
  );
};

export default HelpButton2;