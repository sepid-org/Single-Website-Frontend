import React, { FC, Suspense } from 'react';
import { Box, Container, Paper, Stack, Typography } from '@mui/material';

import { CircularProgress } from '@mui/material';
import WebsiteLogo from 'commons/components/atoms/logos/WebsiteLogo';
import { useGetWebsiteQuery } from '../redux/features/WebsiteSlice';
import ClassicAuthTabs from 'commons/components/organisms/auth/ClassicAuth';

type PropsType = {};

const Authentication: FC<PropsType> = () => {

  return (
    <Container
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Stack spacing={4} alignItems="center" width={400}>
        <Box pb={2}>
          <WebsiteLogo size="large" />
        </Box>

        <Stack
          width="100%"
          component={Paper}
          spacing={2}
          p={2}
          alignItems="center"
        >
          <Suspense fallback={<CircularProgress size={18} />}>
            <ClassicAuthTabs />
          </Suspense>
        </Stack>
      </Stack>
    </Container>
  );
};

export default Authentication;