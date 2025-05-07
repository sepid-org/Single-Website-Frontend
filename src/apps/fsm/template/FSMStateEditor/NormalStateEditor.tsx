import {
  Container,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import React, { FC } from 'react';
import { PaperEditor } from 'commons/template/Paper';
import useFSMState from 'apps/fsm/hooks/useFSMState';

type NormalStateEditorPropsType = {
  fsmStateId: string;
}

const NormalStateEditor: FC<NormalStateEditorPropsType> = ({ fsmStateId }) => {
  const { fsmState } = useFSMState(parseInt(fsmStateId));
  const paperId = fsmState.papers[0];

  return (
    <Container maxWidth='md' sx={{ paddingY: 2 }}>
      <Stack spacing={2}>
        <Typography variant='h2' gutterBottom>
          {'مسئله‌ها'}
        </Typography>
        <Divider />
        <PaperEditor paperId={paperId} mode='problems' />
        <Typography variant='h2' gutterBottom>
          {'محتواها'}
        </Typography>
        <Divider />
        <PaperEditor paperId={paperId} mode='contents' />
      </Stack>
    </Container>
  );
}

export default NormalStateEditor;
