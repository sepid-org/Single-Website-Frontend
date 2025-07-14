import { Box, Container, Paper, Stack } from '@mui/material';
import ProgramLogo from 'commons/components/atoms/logos/ProgramLogo';
import ClassicAuthTabs from 'commons/components/organisms/auth/ClassicAuth';
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

type PropsType = {}

const Authentication: FC<PropsType> = () => {
  const { programSlug } = useParams();
  return (
    <Container
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Stack
        spacing={4}
        alignItems={'center'}
        width={400}>

        <Box pb={2}>
          <ProgramLogo size='large' />
        </Box>

        <Stack
          width={'100%'}
          component={Paper}
          spacing={2}
          padding={2}
          alignItems={'center'}>
          <ClassicAuthTabs basePath={`/program/${programSlug}/auth`} />
        </Stack>

      </Stack>
    </Container>
  );
};

export default Authentication;