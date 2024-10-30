import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import React, { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from "react-helmet";

import { useGetProgramUserFSMsStatusQuery, useGetProgramQuery } from 'apps/website-display/redux/features/program/ProgramSlice';
import { useGetFSMsQuery } from 'apps/fsm/redux/slices/fsm/FSMSlice';
import useLocalNavigate from '../hooks/useLocalNavigate';
import useMenuCourts from '../hooks/useMenuCourts';
import ProgramLogo from 'commons/components/atoms/logos/ProgramLogo';
import { FSMStateProvider } from 'commons/hooks/useFSMStateContext';
import { FSMProvider } from 'commons/hooks/useFSMContext';
import FSMState from 'apps/fsm/template/FSMState';

type GameMenuPropsType = {}

const GameMenu: FC<GameMenuPropsType> = ({ }) => {
  const localNavigate = useLocalNavigate();
  const { programSlug } = useParams();
  const [pageNumber, setPageNumber] = useState(1);
  const { data: program } = useGetProgramQuery({ programSlug });
  const { data: fsmsData } = useGetFSMsQuery({ programSlug, pageNumber })
  const { data: programUserFSMsStatus } = useGetProgramUserFSMsStatusQuery({ programSlug });
  const { courts } = useMenuCourts();

  const fsmId = process.env.NODE_ENV === 'development' ? '6' : '214';
  const fsmStateId = process.env.NODE_ENV === 'development' ? '318' : '19870';

  return (
    <Box position={'relative'}>
      {program &&
        <Helmet>
          <title>{program.name}</title>
        </Helmet>
      }
      <FSMProvider fsmId={fsmId}>
        <FSMStateProvider fsmStateId={fsmStateId}>
          <FSMState fsmStateId={fsmStateId} />
        </FSMStateProvider>
      </FSMProvider>
      <Stack component={Paper} spacing={2} padding={2} top={0} left={0} position={'absolute'}>
        <ProgramLogo />
        <Typography textAlign={'center'}>
          {'مهلت تا پایان دوره: ۵۰ روز'}
        </Typography>
        <Button variant='contained'>
          {'حلقه دوستان'}
        </Button>
        <Button variant='outlined'>
          {'شاخ‌ترین‌ها'}
        </Button>
      </Stack>
    </Box>
  );
}

export default GameMenu;
