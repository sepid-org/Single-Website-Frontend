import { Box, Divider, Grid, Typography, Stack, useTheme, useMediaQuery } from '@mui/material';
import React, { FC, useMemo } from 'react';
import Widget from 'commons/components/organisms/Widget';
import FSMBackStateButton from 'commons/components/atoms/FSMBackStateButton';
import FSMNextStateButton from 'commons/components/atoms/FSMNextStateButton';
import FSMStateRoadMap from 'commons/components/organisms/FSMStateRoadMap';
import FSMStateHintsButton from 'commons/components/molecules/buttons/FSMStateHints';
import { useGetFSMStateInwardEdgesQuery, useGetFSMStateOutwardEdgesQuery } from 'apps/fsm/redux/slices/fsm/FSMStateSlice';
import { useGetFSMQuery } from 'apps/fsm/redux/slices/fsm/FSMSlice';
import FinishFSMButton from 'commons/components/atoms/FinishFSMButton';
import { useFSMStateContext } from 'commons/hooks/useFSMStateContext';
import Layout from '../Layout';
import Timer from 'commons/components/molecules/Timer';
import { useFSMContext } from 'commons/hooks/useFSMContext';
import useFinishFSM from 'commons/hooks/fsm/useFinishFSM';
import useFSMState from 'apps/fsm/hooks/useFSMState';
import usePaper from 'apps/fsm/hooks/usePaper';

export type WorkshopFSMStatePropsType = {
  fsmStateId: string;
}

const WorkshopFSMState: FC<WorkshopFSMStatePropsType> = ({ fsmStateId }) => {
  const { player, fsmId } = useFSMContext();
  const { fsmState } = useFSMState(parseInt(fsmStateId));
  const paperId = fsmState?.papers[0];
  const { paper } = usePaper(parseInt(paperId));
  const { data: fsm } = useGetFSMQuery({ fsmId });
  const [finishFSM] = useFinishFSM();
  const { isMentor } = useFSMStateContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const visibleWidgets = paper?.widgets.filter(widget => !widget.is_hidden) || [];
  const { data: inwardEdges = [] } = useGetFSMStateInwardEdgesQuery({ fsmStateId });
  const { data: outward_edges = [] } = useGetFSMStateOutwardEdgesQuery({ fsmStateId });

  const questions = visibleWidgets.filter(widget =>
    widget.widget_type.includes('Problem')
  );

  const questionWidgets = useMemo(() =>
    questions.map((widget) => (
      <Stack key={widget.id}>
        <Divider sx={{ mb: theme.spacing(2) }} />
        <Widget paperId={paperId} coveredWithPaper={false} widget={widget} />
      </Stack>
    )), [questions]);

  const notQuestions = visibleWidgets.filter(
    widget => !widget.widget_type.includes('Problem')
  );

  const notQuestionWidgets = useMemo(() =>
    notQuestions.map(widget => (
      <Stack key={widget.id}>
        <Widget paperId={paperId} coveredWithPaper={false} widget={widget} />
      </Stack>
    )), [notQuestions]);

  const handleTimeFinish = () => {
    finishFSM();
  }

  return (
    <Layout appbarMode={fsmState?.show_appbar ? (isMentor ? 'MENTOR_FSM' : 'FSM') : null}>
      <Grid container spacing={2} justifyContent="center" alignItems="flex-start" sx={{ paddingBottom: { xs: 6, md: 0 } }}>
        {/* Sidebar Column */}
        <Grid item xs={12} md={notQuestions.length > 0 ? 3.7 : 6} lg={notQuestions.length > 0 ? 3.8 : 8} position={{ xs: null, md: 'sticky' }} top={0}>
          <Stack spacing={2}>
            <Stack position="relative">
              <Box position="absolute" left={-26} top={-24} sx={{ transform: 'rotate(24deg)' }}>
                <FSMStateHintsButton fsmStateId={fsmStateId} />
              </Box>
              <Typography component="h2" variant="h3" textAlign="center" mb={2}>
                {fsmState?.title}
              </Typography>

              {/* Timer */}
              {fsm?.duration > 0 && (
                <Box position="absolute" right={4} top={4}>
                  <Timer onTimeFinish={handleTimeFinish} duration={fsm.duration} startTime={player?.started_at} />
                </Box>
              )}

              <Stack spacing={2}>
                {questionWidgets}
                {(inwardEdges.length !== 0 || outward_edges.length !== 0) && (
                  <Divider sx={{ display: { xs: 'none', md: 'inherit' } }} />
                )}
                <Stack sx={{ display: { xs: 'none', md: 'inherit' } }}>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <FSMBackStateButton />
                    </Grid>
                    <Grid item xs={8}>
                      {fsmState?.is_end ? <FinishFSMButton /> : <FSMNextStateButton />}
                    </Grid>
                  </Grid>
                </Stack>
              </Stack>
            </Stack>

            {(fsmState && fsm?.show_roadmap) && <FSMStateRoadMap currentNodeName={fsmState.title} />}

            {notQuestions.length === 0 && (
              <Stack sx={{ display: { xs: 'inherit', md: 'none' } }}>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <FSMBackStateButton />
                  </Grid>
                  <Grid item xs={8}>
                    {fsmState?.is_end ? <FinishFSMButton /> : <FSMNextStateButton />}
                  </Grid>
                </Grid>
              </Stack>
            )}
          </Stack>
        </Grid>

        {/* Divider between columns */}
        {notQuestions.length > 0 && (
          <Grid item sx={{ justifyContent: 'center', width: isMobile ? '100%' : 'auto', height: isMobile ? 'auto' : '100%' }}>
            <Divider orientation={isMobile ? 'horizontal' : 'vertical'} sx={{ width: isMobile ? '100%' : 'auto', height: isMobile ? 'auto' : '100%' }} />
          </Grid>
        )}

        {/* Main Content Column */}
        {notQuestions.length > 0 && (
          <Grid item xs={12} md={8} lg={8}>
            <Stack spacing={2}>
              <Stack spacing={1}>{notQuestionWidgets}</Stack>

              {/* Mobile Footer Buttons with themed background */}
              <Stack
                justifyContent="space-around"
                sx={{
                  bgcolor: 'background.paper',
                  display: { xs: 'inherit', md: 'none' },
                  position: 'fixed',
                  bottom: 0,
                  right: 0,
                  left: 0,
                  p: 1,
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <FSMBackStateButton />
                  </Grid>
                  <Grid item xs={8}>
                    {fsmState?.is_end ? <FinishFSMButton /> : <FSMNextStateButton />}
                  </Grid>
                </Grid>
              </Stack>
            </Stack>
          </Grid>
        )}
      </Grid>
    </Layout>
  );
}

export default WorkshopFSMState;