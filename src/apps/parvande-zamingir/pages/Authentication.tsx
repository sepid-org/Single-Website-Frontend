import { Stack } from '@mui/material';
import OtpAuthTabs from 'commons/components/organisms/auth/OtpAuth';
import React from 'react';
import { MediaUrls } from '../constants/mediaUrls';
import FullScreenBackgroundImage from 'commons/components/molecules/FullScreenBackgroundImage';

const Authentication: React.FC = () => {

  return (
    <FullScreenBackgroundImage image={MediaUrls.LOGIN_PAGE_BACKGROUND}>
      <Stack
        spacing={4}
        alignItems="center"
        width={{ xs: 220, sm: 260, md: 300 }}
        sx={{
          ml: -12,
          mb: -10,
          transform: 'rotate(-18deg)',
          transformOrigin: 'center',
          transition: 'transform .3s ease'
        }}
      >
        <OtpAuthTabs />
      </Stack>
    </FullScreenBackgroundImage>
  );
};

export default Authentication;
