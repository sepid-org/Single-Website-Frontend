import React, { FC } from 'react';
import { Typography, useMediaQuery, useTheme } from '@mui/material';
import { EditPaper } from '../Paper';
import { useGetFSMStateQuery } from 'apps/fsm/redux/slices/fsm/FSMStateSlice';
import { useFSMContext } from 'commons/hooks/useFSMContext';

type BoardStateEditorPropsType = {}

const BoardStateEditor: FC<BoardStateEditorPropsType> = ({ }) => {
  const theme = useTheme();
  const { fsmStateId } = useFSMContext();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { data } = useGetFSMStateQuery({ fsmStateId });
  // todo: all papers should be displayed
  const paperId = data.papers[0]

  if (isMobile) {
    return (
      <Typography textAlign={'center'} padding={2}>
        {'ویرایش این گام در تلفن همراه امکان‌پذیر نیست :('}
      </Typography>
    )
  }

  return (
    <EditPaper fsmStateId={fsmStateId} paperId={paperId} />
  );
};

export default BoardStateEditor;