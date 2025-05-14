import React, { FC, Fragment, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Grid,
  Stack,
  Typography,
  Pagination,
  CircularProgress,
} from '@mui/material';

import { ITEMS_PER_PAGE_NUMBER } from 'commons/constants/Constants';
import AddNewThingButton from 'commons/components/atoms/AddNewThingButton';
import NoDataFound from 'commons/components/molecules/NoDataFound';

import { useGetProgramQuery } from 'apps/website-display/redux/features/program/ProgramSlice';
import { useGetMeetingsByProgramQuery } from 'apps/program/redux/slices/MeetingSlice';
import MeetingEditorCard from 'apps/program/components/organisms/cards/MeetingEditor';
import MeetingDialog from 'apps/program/components/organisms/dialogs/MeetingDialog';

type PropsType = {};

const MeetingsManagement: FC<PropsType> = () => {
  const { programSlug } = useParams();
  const { data: program } = useGetProgramQuery({ programSlug });

  const [pageNumber, setPageNumber] = useState(1);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);

  const {
    data: meetingsData,
    isLoading,
    isFetching,
  } = useGetMeetingsByProgramQuery(
    {
      programId: program ? parseInt(program.id, 10) : undefined,
      startDate: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
    },
    { skip: !program?.id }
  );

  const meetings = meetingsData?.results || [];
  const totalCount = meetingsData?.count || 0;
  const pageCount = Math.ceil(totalCount / ITEMS_PER_PAGE_NUMBER);

  return (
    <Fragment>
      <Stack padding={2} spacing={2} alignItems="stretch" justifyContent="center">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h2">جلسه‌ها</Typography>
          <AddNewThingButton
            label="ایجاد جلسه جدید"
            onClick={() => setOpenCreateDialog(true)}
          />
        </Stack>

        {isLoading || isFetching ? (
          <CircularProgress />
        ) : meetings.length > 0 ? (
          <Stack spacing={2}>
            <Pagination
              variant="outlined"
              shape="rounded"
              count={pageCount}
              page={pageNumber}
              onChange={(_, v) => setPageNumber(v)}
            />
            <Stack>
              <Grid container spacing={2}>
                {meetings.map((meeting) => (
                  <Grid item xs={12} sm={6} md={4} key={meeting.meeting_id}>
                    <MeetingEditorCard meeting={meeting} />
                  </Grid>
                ))}
              </Grid>
            </Stack>
          </Stack>
        ) : (
          <NoDataFound variant={3} />
        )}
      </Stack>

      <MeetingDialog
        open={openCreateDialog}
        handleClose={() => setOpenCreateDialog(false)}
      />
    </Fragment >
  );
};

export default MeetingsManagement;