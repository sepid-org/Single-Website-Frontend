import {
  Container,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import React, { FC } from 'react';
import { EditPaper } from '../Paper';
import EditHints from '../EditHints';
import { useGetFSMStateQuery } from 'apps/website-display/redux/features/fsm/FSMStateSlice';
import { useFSMContext } from 'commons/hooks/useFSMContext';

type NormalStateEditorPropsType = {}

const NormalStateEditor: FC<NormalStateEditorPropsType> = ({ }) => {
  const { fsmStateId } = useFSMContext();
  const { data: fsmState } = useGetFSMStateQuery({ fsmStateId });
  const paperId = fsmState.papers[0];

  return (
    <Container maxWidth='md' sx={{ paddingBottom: 2 }}>
      <Stack spacing={2}>
        <Typography variant='h2' gutterBottom>
          {'مسئله‌ها'}
        </Typography>
        <Divider />
        <EditPaper fsmStateId={fsmStateId} paperId={paperId} mode='problems' />
        <Typography variant='h2' gutterBottom>
          {'محتواها'}
        </Typography>
        <Divider />
        <EditPaper fsmStateId={fsmStateId} paperId={paperId} mode='contents' />
        <Typography variant="h2" gutterBottom>
          {'راهنمایی‌ها'}
        </Typography>
        <Divider />
        <EditHints hints={fsmState?.hints} type='state' referenceId={fsmStateId} />
      </Stack>
    </Container>
  );
}

export default NormalStateEditor;
