import {
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { Pagination } from '@mui/material';
import React, { useState, Fragment, FC } from 'react';
import { useParams } from 'react-router-dom';
import MentorFSMCard from 'commons/components/organisms/cards/MentorFSMCard';
import CreateFSMDialog from 'apps/program/components/organisms/dialogs/CreateFSMDialog';
import { ITEMS_PER_PAGE_NUMBER } from 'commons/constants/Constants';
import AddNewThingButton from 'commons/components/atoms/AddNewThingButton';
import { useGetFSMsQuery } from 'apps/fsm/redux/slices/fsm/FSMSlice';
import NoDataFound from 'commons/components/molecules/NoDataFound';
import { useGetProgramQuery } from 'apps/website-display/redux/features/program/ProgramSlice';

type PropsType = {}

const FSMsManagement: FC<PropsType> = ({ }) => {
  const { programSlug } = useParams();
  const { data: program } = useGetProgramQuery({ programSlug });
  const [openCreateFSMDialog, setOpenCreateFSMDialog] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const { data: fsmsData, isLoading } = useGetFSMsQuery({ programSlug, pageNumber }, { skip: !Boolean(program) });

  return (
    <Fragment>
      <Stack spacing={2} alignItems={'stretch'} justifyContent={'center'}>

        <Stack padding={2} spacing={2}>
          <Stack direction={'row'} justifyContent={'space-between'} alignItems={'start'}>
            <Typography variant='h2' gutterBottom>
              {'کارگاه‌ها'}
            </Typography>
            <AddNewThingButton label={'ایجاد کارگاه جدید'} onClick={() => setOpenCreateFSMDialog(true)} />
          </Stack>
          <Stack spacing={2}>
            {(!isLoading && fsmsData?.fsms?.length > 0) &&
              <Pagination
                variant="outlined"
                color="primary"
                shape='rounded'
                count={Math.ceil(fsmsData?.count / ITEMS_PER_PAGE_NUMBER)}
                page={pageNumber}
                onChange={(e, value) => setPageNumber(value)}
              />
            }
            <Stack>
              <Grid container spacing={2}
                alignItems='stretch'
                justifyContent="center"
                sx={(theme) => ({
                  justifyContent: 'start',
                  [theme.breakpoints.down('sm')]: {
                    justifyContent: 'center',
                    marginRight: "0px",
                  },
                })}>
                {fsmsData?.fsms?.map((fsm) => (
                  <Grid item xs={12} sm={6} md={4} key={fsm.id}>
                    <MentorFSMCard {...fsm} />
                  </Grid>
                ))}
              </Grid>
            </Stack>
            {(!isLoading && fsmsData?.fsms?.length == 0) &&
              <NoDataFound variant={3} />
            }
          </Stack>
        </Stack>

      </Stack>
      <CreateFSMDialog
        open={openCreateFSMDialog}
        handleClose={() => setOpenCreateFSMDialog(false)}
      />
    </Fragment>
  );
}

export default FSMsManagement;
