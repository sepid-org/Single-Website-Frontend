import React, { useState, useRef, Fragment } from 'react';
import {
  Box,
  Fab,
  Popover,
  IconButton,
  Grow,
  Typography,
  Stack
} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import Paper from 'commons/template/Paper';
import { useGetThirdPartiesQuery } from 'apps/website-display/redux/features/ThirdPartySlice';

export default function SupportChat() {
  const [anchorEl, setAnchorEl] = useState(null);
  const { data: thirdParties } = useGetThirdPartiesQuery();
  const fabRef = useRef(null);

  const handleToggle = event => {
    if (anchorEl) setAnchorEl(null);
    else setAnchorEl(event.currentTarget);
  };

  const paperSiteSupports = thirdParties?.filter(thirdParty => thirdParty.third_party_type == 'SiteSupportService' && thirdParty.type === 'Paper')
  const paperSiteSupportId = paperSiteSupports?.[0]?.token;
  const open = Boolean(anchorEl);

  if (!paperSiteSupportId) {
    return;
  }

  return (
    <Fragment>
      <Box
        sx={{
          position: 'fixed',
          bottom: { xs: 16, sm: 32 },
          right: { xs: 16, sm: 32 },
          zIndex: 1,
        }}
      >
        <Fab
          ref={fabRef}
          color="primary"
          onClick={handleToggle}
          sx={{ opacity: open ? 0 : 1 }}
        >
          <ChatIcon />
        </Fab>
      </Box>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleToggle}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        TransitionComponent={Grow}
        slotProps={{
          paper: {
            sx: {
              width: { xs: '100%', sm: 400 },
              height: { xs: 480, sm: 600 },
              overflowY: 'hidden',
            }
          }
        }}
      >
        <Stack height={'100%'}>
          <Stack
            padding={1}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            bgcolor="primary.main"
            color="primary.contrastText"
          >
            <Typography variant="subtitle1">پشتیبانی</Typography>
            <IconButton size="small" onClick={handleToggle} sx={{ color: 'inherit' }}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Stack>

          <Stack padding={1} spacing={1} sx={{ overflowY: 'auto' }}>
            <Paper paperId={paperSiteSupportId} mode="general" />
          </Stack>
        </Stack>
      </Popover>
    </Fragment>
  );
}