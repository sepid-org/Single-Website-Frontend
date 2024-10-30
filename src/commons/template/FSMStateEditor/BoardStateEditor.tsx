import React, { FC } from 'react';
import { Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useGetFSMStateQuery } from 'apps/fsm/redux/slices/fsm/FSMStateSlice';
import FSMStatePapersList from 'apps/fsm/components/molecules/FSMStatePapersList';
import BoardPaperEditor from 'commons/template/PaperEditor/BoardPaperEditor';
import AddPaperToFSMState from 'apps/fsm/components/molecules/AddPaperToFSMState';

type BoardStateEditorPropsType = {
  fsmStateId: string;
}

const BoardStateEditor: FC<BoardStateEditorPropsType> = ({ fsmStateId }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { data: fsmState } = useGetFSMStateQuery({ fsmStateId }, { skip: !Boolean(fsmStateId) });

  if (isMobile) {
    return (
      <Typography textAlign={'center'} padding={2}>
        {'ویرایش این گام در تلفن همراه امکان‌پذیر نیست :('}
      </Typography>
    )
  }

  return (
    <Grid container spacing={2} overflow={'hidden'} alignItems={'start'}>
      <Grid item md={3}>
        <AddPaperToFSMState fsmStateId={fsmStateId} />
        <FSMStatePapersList paperIds={fsmState?.papers} fsmStateId={fsmStateId} />
      </Grid>
      <Grid item md={9}>
        <BoardPaperEditor paperId={fsmState?.papers[fsmState?.papers.length - 1]} backgroundPaperIds={fsmState?.papers.slice(0, -1)} />
      </Grid>
    </Grid>
  );
};

export default BoardStateEditor;