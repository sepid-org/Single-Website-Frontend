import React, { Fragment, useState } from 'react';
import { Box, Dialog, DialogContent } from '@mui/material';
import DashboardButton3 from './DashboardButton3';
import QuestionIcon from '../icons/HelpIcon';
import { useParams } from 'react-router-dom';
import { useGetProgramQuery } from 'apps/website-display/redux/features/program/ProgramSlice';
import Paper from 'commons/template/Paper';

const HelpButton = ({ }) => {
  const { programSlug } = useParams();
  const { data: program } = useGetProgramQuery({ programSlug });
  const [openHelpDialog, setOpenHelpDialog] = useState(false);

  return (
    <Fragment>
      <DashboardButton3 label='راهنما' icon={<QuestionIcon />} onClick={() => setOpenHelpDialog(true)} />
      <Dialog
        fullWidth
        maxWidth='sm'
        open={openHelpDialog}
        onClose={() => setOpenHelpDialog(false)}
        disableScrollLock
      >
        <DialogContent>
          {/* <Box position={'relative'} width={{ xs: 300, sm: 400, md: 600 }} padding={2} sx={{ overflowX: 'hidden' }}> */}
          <Paper mode='general' paperId={program.site_help_paper_id} />
          {/* </Box> */}
        </DialogContent>
      </Dialog>
    </Fragment >
  );
};

export default HelpButton;