import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import {
  Grid,
  Stack,
  CircularProgress,
  Typography,
} from '@mui/material';

import { useGetProgramQuery } from 'apps/website-display/redux/features/program/ProgramSlice';
import { useGetMeetingsByProgramQuery } from 'apps/program/redux/slices/MeetingSlice';
import MeetingCard from '../components/organisms/cards/Meeting';

type PropsType = {};

const Meetings: FC<PropsType> = () => {
  const { programSlug } = useParams();
  const { data: program } = useGetProgramQuery({ programSlug });

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
  console.log(meetings);
  const meetingsSample = [
    {
      meeting_id: '1',
      title: 'عنوان jhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhاول',
      description: 'Daily stand-up meeting with the team.',
      start_time: new Date(new Date().getTime() - 5 * 60000).toISOString(), // started 5 mins ago
      duration: 30
    },
    {
      meeting_id: '2',
      title: 'Product Planning',
      description: 'Discuss upcoming product features.',
      start_time: new Date(new Date().getTime() + 60 * 60000).toISOString(), // in 1 hour
      duration: 45
    }
  ];

  if (isLoading || isFetching) {
    return (
      <CircularProgress />
    )
  }

  if (meetingsSample.length > 0) {
    return (
      <Stack spacing={2} mb={2}>
        <Typography component="h1" fontWeight={700} fontSize={28} gutterBottom>
          {'جلسه‌ها'}
        </Typography>
        <Stack>
          <Grid container spacing={2} direction="row" wrap='nowrap' overflow='auto'>
            {meetingsSample.map((meeting) => (
              <Grid item xs={12} sm={6} md={4} key={meeting.meeting_id}>
                <MeetingCard meeting={meeting} />
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Stack>
    );
  }
};

export default Meetings;