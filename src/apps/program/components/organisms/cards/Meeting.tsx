import React, { FC } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { useLazyJoinMeetingQuery } from 'apps/program/redux/slices/MeetingSlice';
import { Button } from '@mui/material';
import { MeetingType } from 'apps/program/template/types';
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

  const [trigger, { isFetching }] = useLazyJoinMeetingQuery();

  const handleEnter = async () => {
    try {
      const result = await trigger({ meetingId: meeting_id });
      const url = result.data?.join_url;
      if (url && result.isSuccess) {
        window.open(url, '_blank');
      }
    } catch (err) {
      console.error('Error fetching join link', err);
    }
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