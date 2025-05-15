import React, { FC } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useLazyJoinMeetingQuery } from 'apps/program/redux/slices/MeetingSlice';
import { Button, CardHeader } from '@mui/material';
import { MeetingType } from 'apps/program/template/types';
import { styled, keyframes } from '@mui/system';
import LoginIcon from '@mui/icons-material/Login';
import { formatStart } from 'apps/program/utils';

type PropsType = {
  meeting: MeetingType;
}

const MeetingCard = ({ meeting }) => {
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

  const now = new Date();

  const start = new Date(start_time);
  const end = new Date(start.getTime() + Number(duration) * 60000);
  const active = now >= start && now <= end;

  const pulseBorder = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(25, 118, 210, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(25, 118, 210, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(25, 118, 210, 0);
  }
`;

  const AnimatedCard = styled(Card)(({ theme }) => ({
    animation: `${pulseBorder} 2s infinite`,
    border: `2px solid ${theme.palette.primary.main}`
  }));

  const EnhancedCard = styled(Card)(({ theme }) => ({
    border: `1.5px solid #e0e0e0`,
    borderRadius: 12,
  }));

  const CardComponent = active ? AnimatedCard : EnhancedCard;

  return (
    <CardComponent
      key={meeting_id}
      sx={{ flexShrink: 0, borderRadius: 2, boxShadow: 3, width: 200, }}
    >
      <CardHeader
        title={
          <Typography
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
            variant='h4'
          >
            {title || 'بدون عنوان'}
          </Typography>
        }
        whiteSpace={'nowrap'}
        overflow={'hidden'}
        textOverflow={'ellipsis'}
      />
      <CardContent>
        <Typography variant="body1">
          {`آغاز: ${formatStart(start_time)}`}
        </Typography>

        <Button
          color="primary"
          disabled={!active}
          onClick={handleEnter}
          sx={{ mt: 2, }}
          startIcon={<LoginIcon />}
        >
          {'ورود به جلسه'}
        </Button>
      </CardContent>
    </CardComponent>
  );
};

export default MeetingCard;