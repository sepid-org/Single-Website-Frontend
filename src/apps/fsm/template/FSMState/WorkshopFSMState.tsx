import { Box, Divider, Grid, Paper, Typography, Stack } from '@mui/material';
import React, { FC, Fragment, useMemo } from 'react';
import Widget from 'commons/components/organisms/Widget';
import FSMBackStateButton from 'commons/components/atoms/FSMBackStateButton';
import FSMNextStateButton from 'commons/components/atoms/FSMNextStateButton';
import FSMStateRoadMap from 'commons/components/organisms/FSMStateRoadMap';
import FSMStateHintsButton from 'commons/components/molecules/buttons/FSMStateHints';
import { useGetPaperQuery } from 'apps/website-display/redux/features/paper/PaperSlice';
import { useGetFSMStateQuery } from 'apps/fsm/redux/slices/fsm/FSMStateSlice';
import { useGetFSMQuery } from 'apps/fsm/redux/slices/fsm/FSMSlice';
import { useParams } from 'react-router-dom';
import FinishFSMButton from 'commons/components/atoms/FinishFSMButton';
import { useFSMStateContext } from 'commons/hooks/useFSMStateContext';
import Layout from 'commons/template/Layout';

export type WorkshopFSMStatePropsType = {
  fsmStateId: string;
}

const WorkshopFSMState: FC<WorkshopFSMStatePropsType> = ({ fsmStateId }) => {
  const fsmId = parseInt(useParams().fsmId);
  const { data: state } = useGetFSMStateQuery({ fsmStateId }, { skip: !Boolean(fsmStateId) })
  const paperId = state.papers[0];
  const { data: paper } = useGetPaperQuery({ paperId }, { skip: !Boolean(paperId) });
  const { data: fsm } = useGetFSMQuery({ fsmId });
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

  return (
    <Layout appbarMode={isMentor ? 'MENTOR_FSM' : 'FSM'}>
      <Grid container spacing={2} justifyContent="center" alignItems='flex-start'>
        <Grid
          item xs={12}
          md={notQuestions.length > 0 ? 4 : 6}
          lg={notQuestions.length > 0 ? 4 : 8}
          position={{ xs: null, md: 'sticky' }} top={0}>
          <Stack spacing={2}>
            <Stack spacing={2} component={Paper} sx={{ padding: 2 }} position={'relative'}>
              <Box sx={{ position: 'absolute', left: -26, top: -24, rotate: '24deg' }}>
                <FSMStateHintsButton fsmStateId={fsmStateId} />
              </Box>
              <Typography component="h2" variant="h3" align='center' alignSelf={'center'}>
                {state?.title}
              </Typography>
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
                    {state.is_end ?
                      <FinishFSMButton /> :
                      <FSMNextStateButton />
                    }
                  </Grid>
                </Grid>
              </Stack>
            }
          </Stack>
        </Grid>
        {notQuestions.length > 0 && (
          <Grid item xs={12} md={8} lg={8}>
            <Stack spacing={2}>
              <Stack component={Paper} sx={{ padding: 1 }} spacing={1}>
                {notQuestionWidgets}
              </Stack>
              <Stack sx={{ display: { xs: 'inherit', md: 'none' } }} >
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <FSMBackStateButton />
                  </Grid>
                  <Grid item xs={6}>
                    {state.is_end ?
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
