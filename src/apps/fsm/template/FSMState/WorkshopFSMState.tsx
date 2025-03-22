import { Box, Divider, Grid, Paper, Typography, Stack } from '@mui/material';
import React, { FC, useMemo } from 'react';
import Widget from 'commons/components/organisms/Widget';
import FSMBackStateButton from 'commons/components/atoms/FSMBackStateButton';
import FSMNextStateButton from 'commons/components/atoms/FSMNextStateButton';
import FSMStateRoadMap from 'commons/components/organisms/FSMStateRoadMap';
import FSMStateHintsButton from 'commons/components/molecules/buttons/FSMStateHints';
import { useGetPaperQuery } from 'apps/website-display/redux/features/paper/PaperSlice';
import { useGetFSMStateQuery } from 'apps/fsm/redux/slices/fsm/FSMStateSlice';
import { useGetFSMQuery } from 'apps/fsm/redux/slices/fsm/FSMSlice';
import FinishFSMButton from 'commons/components/atoms/FinishFSMButton';
import { useFSMStateContext } from 'commons/hooks/useFSMStateContext';
import Layout from 'commons/template/Layout';
import Timer from 'commons/components/molecules/Timer';
import { useFSMContext } from 'commons/hooks/useFSMContext';
import useFinishFSM from 'commons/hooks/fsm/useFinishFSM';

export type WorkshopFSMStatePropsType = {
  fsmStateId: string;
}

const WorkshopFSMState: FC<WorkshopFSMStatePropsType> = ({ fsmStateId }) => {
  const { data: state } = useGetFSMStateQuery({ fsmStateId }, { skip: !Boolean(fsmStateId) })
  const paperId = state?.papers[0];
  const { player, fsmId } = useFSMContext();
  const { data: paper } = useGetPaperQuery({ paperId }, { skip: !Boolean(paperId) });
  const { data: fsm } = useGetFSMQuery({ fsmId });
  const [finishFSM] = useFinishFSM();
  // todo:
  const { isMentor } = useFSMStateContext();

  const visibleWidgets = paper?.widgets.filter(widget => !widget.is_hidden) || []
  const inward_edges = state?.inward_edges || [];
  const outward_edges = state?.outward_edges || [];

  visibleWidgets.sort((a, b) => parseInt(a.id) - parseInt(b.id));

  const questions = visibleWidgets.filter((widget) =>
    widget.widget_type.includes('Problem')
  );

  const questionWidgets = useMemo(() =>
    questions.map((widget, index) => (
      <Stack key={widget.id}>
        <Divider style={{ marginBottom: 20 }} />
        <Widget paperId={paperId} coveredWithPaper={false} key={widget.id} widget={widget} />
      </Stack>
    )), [questions]);

  const notQuestions = visibleWidgets.filter(
    (widget) => !widget.widget_type.includes('Problem')
  );

  const notQuestionWidgets = useMemo(() =>
    notQuestions.map((widget) => (
      <Stack key={widget.id}>
        <Widget paperId={paperId} coveredWithPaper={false} widget={widget} />
      </Stack>
    )), [notQuestions]);

  const handleTimeFinish = () => {
    finishFSM();
  }

  return (
    <Layout appbarMode={state.show_appbar ? (isMentor ? 'MENTOR_FSM' : 'FSM') : null}>
      <Grid container spacing={2} justifyContent="center" alignItems='flex-start'>
        <Grid
          item xs={12}
          md={notQuestions.length > 0 ? 3.8 : 6}
          lg={notQuestions.length > 0 ? 3.8 : 8}
          position={{ xs: null, md: 'sticky' }} top={0}>
          <Stack spacing={2}>
            <Stack position={'relative'}>
              <Box position={'absolute'} left={-26} top={-24} sx={{ rotate: '24deg' }}>
                <FSMStateHintsButton fsmStateId={fsmStateId} />
              </Box>
              <Typography component="h2" variant="h3" textAlign={'center'} mb={2}>
                {state?.title}
              </Typography>
              {fsm?.duration > 0 &&
                <Box position={'absolute'} right={8} top={8}>
                  <Timer onTimeFinish={handleTimeFinish} duration={fsm?.duration} startTime={player?.started_at} />
                </Box>
              }
              <Stack spacing={2}>
                {questionWidgets}
                {!(inward_edges?.length === 0 && outward_edges?.length === 0) &&
                  <Divider sx={{ display: { xs: 'none', md: 'inherit' } }} />
                }
                <Stack sx={{ display: { xs: 'none', md: 'inherit' } }}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <FSMBackStateButton />
                    </Grid>
                    <Grid item xs={6}>
                      {state?.is_end ?
                        <FinishFSMButton /> :
                        <FSMNextStateButton />
                      }
                    </Grid>
                  </Grid>
                </Stack>
              </Stack>
            </Stack>
            {(state && fsm?.show_roadmap) &&
              <FSMStateRoadMap currentNodeName={state?.title} />
            }
            {notQuestions.length === 0 &&
              <Stack sx={{ display: { xs: 'inherit', md: 'none' } }} >
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <FSMBackStateButton />
                  </Grid>
                  <Grid item xs={6}>
                    {state?.is_end ?
                      <FinishFSMButton /> :
                      <FSMNextStateButton />
                    }
                  </Grid>
                </Grid>
              </Stack>
            }
          </Stack>
        </Grid>

        <Grid item sx={{ height: '100%' }} >
          <Divider orientation='vertical' />
        </Grid>

        {notQuestions.length > 0 && (
          <Grid item xs={12} md={8} lg={8}>
            <Stack spacing={2}>
              <Stack spacing={1}>
                {notQuestionWidgets}
              </Stack>
              <Stack
                justifyContent={'space-around'}
                sx={{
                  display: { xs: 'inherit', md: 'none' },
                  position: 'fixed',
                  bottom: 0,
                  right: 0,
                  left: 0,
                  padding: 1,
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <FSMBackStateButton />
                  </Grid>
                  <Grid item xs={6}>
                    {state?.is_end ?
                      <FinishFSMButton /> :
                      <FSMNextStateButton />
                    }
                  </Grid>
                </Grid>
              </Stack>
            </Stack>
          </Grid>
        )}
      </Grid >
    </Layout>
  );
}

export default WorkshopFSMState;
