import { Box, Button, Grid, Pagination, Paper, Stack, Typography } from '@mui/material';
import React, { FC, Fragment, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from "react-helmet";

import ProgramPageSidebar from 'apps/program/components/organisms/ProgramPageSidebar';
import { useGetProgramUserFSMsStatusQuery, useGetProgramQuery } from 'apps/website-display/redux/features/program/ProgramSlice';
import Layout from 'commons/template/Layout';
import { useGetFSMsQuery } from 'apps/fsm/redux/slices/fsm/FSMSlice';
import FSMCard from '../components/organisms/cards/FSMCard';
import useLocalNavigate from '../hooks/useLocalNavigate';
import useMenuCourts from '../hooks/useMenuCourts';
import MyTotalScoreChip from '../components/molecules/chips/MyTotalScore';
import PapersBoardScene from 'commons/template/Paper/PapersBoardScene';
import ProgramLogo from 'commons/components/atoms/logos/ProgramLogo';

type GameMenuPropsType = {}

const GameMenu: FC<GameMenuPropsType> = ({ }) => {
  const localNavigate = useLocalNavigate();
  const { programSlug } = useParams();
  const [pageNumber, setPageNumber] = useState(1);
  const { data: program } = useGetProgramQuery({ programSlug });
  const { data: fsmsData } = useGetFSMsQuery({ programSlug, pageNumber })
  const { data: programUserFSMsStatus } = useGetProgramUserFSMsStatusQuery({ programSlug });
  const { courts } = useMenuCourts();

  return (
    <Box position={'relative'}>
      {program &&
        <Helmet>
          <title>{program.name}</title>
        </Helmet>
      }
      <PapersBoardScene
        complementaryObjects={[]}
        paperIds={["120", "90"]}
      />
      <Stack component={Paper} spacing={2} padding={2} top={0} left={0} position={'absolute'}>
        <ProgramLogo />
        <Typography>
          {'مهلت تا پایان دوره: ۵۰ روز'}
        </Typography>
      </Stack>
    </Box>
  );
}

export default GameMenu;
