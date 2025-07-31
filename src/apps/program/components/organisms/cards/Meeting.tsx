import React, { FC, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { useJoinMeetingMutation } from 'apps/program/redux/slices/MeetingSlice';
import { Button } from '@mui/material';
import { MeetingType } from 'apps/program/types/types';
import LoginIcon from '@mui/icons-material/Login';
import { formatDuration, formatStart } from 'apps/program/utils';

type PropsType = {
  meeting: MeetingType;
}

const MeetingCard: FC<PropsType> = ({ meeting }) => {
  const {
    title,
    description,
    start_time,
    duration,
    meeting_id,
  } = meeting;

  const [joinMeeting, { data }] = useJoinMeetingMutation();

  useEffect(() => {
    if (data?.join_url) {
      window.open(data.join_url, '_blank')
    }
  }, [data?.join_url])

  const handleEnter = async () => {
    joinMeeting({ meetingId: meeting_id });
  };

  return (
    <Card sx={{ maxWidth: 345, borderRadius: 2, boxShadow: 3 }}>
      <CardHeader
        title={title || 'بدون عنوان'}
        subheader={`آغاز: ${formatStart(start_time)}`}
        titleTypographyProps={{ variant: 'h4' }}
        subheaderTypographyProps={{ variant: 'subtitle2' }}
      />

      <CardContent>
        <Stack spacing={1}>
          <Typography variant="body2">
            <strong>توضیحات:</strong> {description || 'بدون توضیحات'}
          </Typography>
          <Typography variant="body2">
            <strong>مدت:</strong> {formatDuration(duration)}
          </Typography>
        </Stack>
      </CardContent>

      <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
        <Button onClick={handleEnter} startIcon={<LoginIcon />}>
          ورود به جلسه
        </Button>
      </CardActions>
    </Card>
  );
};

export default MeetingCard;