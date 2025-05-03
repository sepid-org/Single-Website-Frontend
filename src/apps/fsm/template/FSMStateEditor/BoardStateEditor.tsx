import React, { FC } from 'react';
import { Divider, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import FSMStatePapersList from 'apps/fsm/components/molecules/FSMStatePapersList';
import BoardEditor from 'commons/template/BoardEditor';
import AddPaperToFSMState from 'apps/fsm/components/molecules/AddPaperToFSMState';
import { useFSMContext } from 'commons/hooks/useFSMContext';

type BoardStateEditorPropsType = {
  fsmStateId: string;
}

const BoardStateEditor: FC<BoardStateEditorPropsType> = ({ fsmStateId }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { useGetFSMState } = useFSMContext();
  const { fsmState } = useGetFSMState({ fsmStateId });

  if (isMobile) {
    return (
      <Typography textAlign={'center'} padding={2}>
        {'ویرایش این گام در تلفن همراه امکان‌پذیر نیست :('}
      </Typography>
    )
  }

  return (
    <Grid container overflow={'hidden'} alignItems={'start'} style={{ flexWrap: 'nowrap' }}>
      <Grid item md={3}>
        <AddPaperToFSMState fsmStateId={fsmStateId} />
        <FSMStatePapersList paperIds={fsmState?.papers} fsmStateId={fsmStateId} />
      </Grid>
      <Divider orientation='vertical' flexItem />
      <Grid item md={9}>
        <BoardEditor paperId={fsmState?.papers[fsmState?.papers.length - 1]} backgroundPaperIds={fsmState?.papers.slice(0, -1)} />
      </Grid>
    </Grid>
  );
};

export default BoardStateEditor;