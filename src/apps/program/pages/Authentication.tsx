import React, { FC, Suspense } from 'react';
import { Box, Container, Paper, Stack, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

import { CircularProgress } from '@mui/material';
import ProgramLogo from 'commons/components/atoms/logos/ProgramLogo';
import { templates, AuthKey } from 'commons/components/organisms/auth/registery';
import { useGetProgramQuery } from 'apps/website-display/redux/features/program/ProgramSlice';
import ClassicAuthTabs from 'commons/components/organisms/auth/ClassicAuth';

type PropsType = {};

const Authentication: FC<PropsType> = () => {
  const { programSlug } = useParams();
  const { data: program, isLoading } = useGetProgramQuery({ programSlug });

  if (isLoading) return null;

  const authMethod: AuthKey =
    (program?.auth_method as AuthKey) ?? 'otp';

  const AuthComponent = templates[authMethod] ?? templates.otp;

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
          <ProgramLogo size="large" />
        </Box>

        <Stack
          width="100%"
          component={Paper}
          spacing={2}
          p={2}
          alignItems="center"
        >
          <Suspense fallback={<CircularProgress size={18} />}>
            {/* todo: fix classic mode */}
            {program.auth_method === 'classic' ?
              <ClassicAuthTabs basePath={`/program/${programSlug}/auth`} /> :
              <AuthComponent />
            }
          </Suspense>
        </Stack>
      </Stack>
    </Container>
  );
};

export default Authentication;