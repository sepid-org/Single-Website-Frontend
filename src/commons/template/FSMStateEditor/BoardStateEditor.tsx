import React, { FC, useEffect, useState } from 'react';
import { Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useGetFSMStateQuery } from 'apps/fsm/redux/slices/fsm/FSMStateSlice';
import PapersList from 'apps/fsm/components/molecules/PapersList';
import BoardPaperEditor from '../PaperEditor/BoardPaperEditor';
import AddPaperToFSMState from 'apps/fsm/components/molecules/AddPaperToFSMState';

type BoardStateEditorPropsType = {
  fsmStateId: string;
}

const BoardStateEditor: FC<BoardStateEditorPropsType> = ({ fsmStateId }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { data: fsmState } = useGetFSMStateQuery({ fsmStateId });
  const [currentPaperId, setCurrentPaperId] = useState<string>('');

  useEffect(() => {
    if (fsmState) {
      setCurrentPaperId(fsmState.papers[0]);
    }
  }, [fsmState])

  if (isMobile) {
    return (
      <Typography textAlign={'center'} padding={2}>
        {'ویرایش این گام در تلفن همراه امکان‌پذیر نیست :('}
      </Typography>
    )
  }

  return (
    <Grid container spacing={2} overflow={'hidden'} alignItems={'start'}>
      <Grid item md={2}>
        <AddPaperToFSMState fsmStateId={fsmStateId} />
        <PapersList paperIds={fsmState.papers} fsmStateId={fsmStateId} />
      </Grid>
      <Grid item md={10}>
        {currentPaperId &&
          <BoardPaperEditor paperId={currentPaperId} backgroundPaperIds={fsmState.papers.slice(-1)} />
        }
      </Grid>
    </Grid>
  );
};

export default BoardStateEditor;