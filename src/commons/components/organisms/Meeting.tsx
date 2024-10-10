import { Box, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import {
  Cancel as CancelIcon,
  Refresh as RefreshIcon,
  Warning as WarningIcon,
  Help as HelpIcon,
} from '@mui/icons-material';
import React, { useEffect, useRef, useState } from 'react';
import CustomJitsiMeeting from './CustomJitsiMeeting';
import MeetingCustomSpinner from 'commons/components/atoms/MeetingCustomSpinner';
import useUserProfile from 'commons/hooks/useUserProfile';
import { useFSMContext } from 'commons/hooks/useFSMContext';

function Meeting({ handleClose }) {
  const [random, setRandom] = useState(0);
  const [showWarning, setShowWarning] = useState(true);
  const { data: userProfile } = useUserProfile();
  const { isMentor, teamId } = useFSMContext();
  const displayName = isMentor ?
    `${userProfile?.first_name} ${userProfile?.last_name} (همیار)` :
    userProfile?.first_name + ' ' + userProfile?.last_name;

  // todo: const { teamRoom, myTeam } = useTeam({ teamId });
  const teamRoom = 'NOT_IMPLEMENTED', myTeam = { name: 'NOT_IMPLEMENTED' };

  const refresh = () => {
    setShowWarning(true);
    setTimeout(() => {
      setShowWarning(false);
    }, 20000)
    setRandom((random) => random + 1);
  }

  const iframeRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      setShowWarning(false);
    }, 20000)
  }, [])

  return (
    <Stack height={'100%'}>
      <Stack
        direction='row'
        justifyContent='space-between'
        alignItems={'center'}
        sx={{
          background: '#c4c4c4',
          cursor: { xs: 'inherit', sm: 'move' },
          paddingX: 1,
          borderTopLeftRadius: { xs: 0, sm: 6 },
          borderTopRightRadius: { xs: 0, sm: 6 },
          height: 40,
        }}>

        <Stack direction={'row'}>
          <Tooltip title='بستن' arrow>
            <IconButton size='small' onClick={handleClose}>
              <CancelIcon />
            </IconButton>
          </Tooltip>
          <Stack display={showWarning ? 'flex' : 'none'} direction={'row'} alignItems={'center'} spacing={0.5}>
            <WarningIcon color='warning' />
            <Typography fontWeight={400} >
              {'ممکن است اتصال کمی طول بکشد'}
            </Typography>
          </Stack>
        </Stack>

        <Stack direction={'row'}>
          <Tooltip title='اگر در اتصال به اتاق گفتگو دچار مشکل شدید، ابتدا وضعیت اتصال خود به اینترنت را بررسی کنید. اگر وضعیت اتصال شما مطلوب بود، با استفاده از گزینه‌ی سمت چپ اتاق را refresh کنید. چنانچه مشکل حل نشد، به پشتیبانی سایت اطلاع دهید.' arrow leaveDelay={0}>
            <IconButton size='small' >
              <HelpIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title='refresh' arrow>
            <IconButton size='small' onClick={refresh}>
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>

      <Box
        sx={{
          width: '100%',
          height: { xs: '100%', sm: 350 - 40 },
        }}>
        {teamRoom
          ? <iframe
            key={random}
            ref={iframeRef}
            src={teamRoom}
            allow="camera *; microphone *; fullscreen *; display-capture *;"
            allowFullScreen
            height='100%'
            width='100%'
            style={{ border: 'none' }} />
          : teamId
            ? <CustomJitsiMeeting
              key={random}
              appId={teamId}
              userDisplayName={displayName} userEmail={''} roomName={`تیم ${myTeam?.name}`} />
            : <MeetingCustomSpinner />
        }
      </Box>
    </Stack>
  );
}

export default Meeting;