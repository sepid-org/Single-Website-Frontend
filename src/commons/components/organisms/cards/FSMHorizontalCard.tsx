import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Button, Stack, Box, IconButton, Tooltip, Skeleton, useTheme, useMediaQuery, Chip } from '@mui/material';
import { Lock, Group, Person } from '@mui/icons-material';
import ModeEditTwoToneIcon from '@mui/icons-material/ModeEditTwoTone';
import EnterFSMPasswordDialog from 'commons/components/organisms/dialogs/EnterFSMPasswordDialog';
import useStartFSM from 'commons/hooks/fsm/useStartFSM';

const FSMHorizontalCard = ({ fsm, isLoading = false, userStatus }) => {
  const [openPassword, setOpenPassword] = useState(false);
  const [startFSM, result] = useStartFSM({ fsmId: fsm?.id });

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const isTablet = useMediaQuery(theme.breakpoints.up('sm'))

  const handleStartFSM = () => {
    startFSM({});
  };

  const cardWidth = '100%';
  const imageWidth = isDesktop ? 240 : isTablet ? 180 : 120;

  if (isLoading) {
    return (
      <Card sx={{ display: 'flex', width: cardWidth, height: { xs: 150, sm: 200, md: 250 }, mb: 2 }}>
        <Skeleton variant="rectangular" width={imageWidth} height="100%" />
        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Skeleton animation="wave" height={20} style={{ marginBottom: 6 }} />
            <Skeleton animation="wave" height={20} width="80%" />
          </CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
            <Skeleton animation="wave" height={20} width="40%" />
          </Box>
        </Box>
      </Card>
    );
  }

  return (
    <Card sx={{ display: 'flex', width: cardWidth, height: { xs: 150, sm: 200, md: 250 }, mb: 2 }}>
      {fsm.cover_page && (
        <CardMedia
          component="img"
          sx={{ width: imageWidth, objectFit: 'cover' }}
          image={fsm.cover_page}
          alt={fsm.name}
        />
      )}
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, overflow: 'hidden' }}>
        <CardContent sx={{ flex: '1 0 auto', display: 'flex', flexDirection: 'column', overflow: 'hidden', p: { xs: 1, sm: 2 } }}>
          <Stack direction="row" alignItems="center" width={'100%'}>
            <Typography component="h2" variant="h4" noWrap sx={{ maxWidth: '100%' }}>
              {fsm.name}
            </Typography>
            {userStatus?.is_mentor && (
              <Tooltip title="ورود به بخش همیاران" arrow>
                <IconButton component={Link} to={`/fsm/${fsm?.id}/manage/`} size='small'>
                  <ModeEditTwoToneIcon />
                </IconButton>
              </Tooltip>
            )}
          </Stack>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: { xs: 2, sm: 3 },
              WebkitBoxOrient: 'vertical',
              flexGrow: 1,
              fontSize: { xs: '0.75rem', sm: '0.875rem' }
            }}
          >
            {fsm.description}
          </Typography>
          <Stack direction="row" alignItems="center" spacing={1}>
            {fsm?.fsm_p_type === 'Team' ?
              <Chip variant='outlined' icon={<Group fontSize="small" />} label={'تیمی'} size="small" /> :
              <Chip variant='outlined' icon={<Person fontSize="small" />} label={'فردی'} size="small" />
            }
          </Stack>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1, mt: 'auto' }}>
          <Button
            variant='outlined'
            color="primary"
            disabled={!fsm?.is_active}
            onClick={handleStartFSM}
            // startIcon={fsm?.has_entrance_lock ? <Lock fontSize="small" /> : null}
            size={isDesktop ? 'medium' : 'small'}
          >
            ورود به کارگاه
          </Button>
        </Box>
      </Box>
      <EnterFSMPasswordDialog
        open={openPassword}
        handleClose={() => setOpenPassword(false)}
        fsmId={fsm?.id}
      />
    </Card>
  );
};

export default FSMHorizontalCard;