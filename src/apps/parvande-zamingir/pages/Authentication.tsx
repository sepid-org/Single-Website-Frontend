import { Container, Stack } from '@mui/material';
import OtpAuthTabs from 'commons/components/organisms/auth/OtpAuth';
import React from 'react';

const Authentication: React.FC = () => {

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage:
          'url(https://cdn.sepid.org/cms/files/login-page-background.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
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
    </Container>
  );
};

export default Authentication;
