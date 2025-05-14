import React, { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Grid,
  Stack,
  Pagination,
  CircularProgress,
} from '@mui/material';

import { ITEMS_PER_PAGE_NUMBER } from 'commons/constants/Constants';
import NoDataFound from 'commons/components/molecules/NoDataFound';

import { useGetProgramQuery } from 'apps/website-display/redux/features/program/ProgramSlice';
import { useGetMeetingsByProgramQuery } from 'apps/program/redux/slices/MeetingSlice';
import MeetingCard from '../components/organisms/cards/Meeting';

type PropsType = {};

const Meetings: FC<PropsType> = () => {
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
    <>
      {isLoading || isFetching ? (
        <CircularProgress />
      ) : meetings.length > 0 ? (
        <Stack spacing={2}>
          <Stack>
            <Grid container spacing={2}>
              {meetings.map((meeting) => (
                <Grid item xs={12} sm={6} md={4} key={meeting.meeting_id}>
                  <MeetingCard meeting={meeting} />
                </Grid>
              ))}
            </Grid>
          </Stack>
          <Pagination
            variant="outlined"
            shape="rounded"
            count={pageCount}
            page={pageNumber}
            onChange={(_, v) => setPageNumber(v)}
          />
        </Stack>
      ) : (
        <NoDataFound variant={3} />
      )}
    </>
  );
};

export default Meetings;