import React, { FC, useEffect, useState } from 'react';
import { Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useGetFSMStateQuery } from 'apps/fsm/redux/slices/fsm/FSMStateSlice';
import { useFSMStateContext } from 'commons/hooks/useFSMStateContext';
import PapersList from '../../components/molecules/state-editor/PapersList';
import BoardPaperEditor from '../PaperEditor/BoardPaperEditor';

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
    <Stack direction={'row'} overflow={'hidden'}>
      <PapersList paperIds={fsmState.papers} fsmStateId={fsmStateId} />
      {currentPaperId &&
        <BoardPaperEditor paperId={currentPaperId} />
      }
    </Stack>
  );
};

export default BoardStateEditor;