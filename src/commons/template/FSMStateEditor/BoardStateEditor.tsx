import React, { FC } from 'react';
import { Typography, useMediaQuery, useTheme } from '@mui/material';
import { PaperEditor } from '../Paper';
import { useGetFSMStateQuery } from 'apps/fsm/redux/slices/fsm/FSMStateSlice';
import { useFSMStateContext } from 'commons/hooks/useFSMStateContext';

type BoardStateEditorPropsType = {}

const BoardStateEditor: FC<BoardStateEditorPropsType> = ({ }) => {
  const theme = useTheme();
  const { fsmStateId } = useFSMStateContext();
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

  // bill
  return (
    <PaperEditor paperId={paperId} />
  );
};

export default BoardStateEditor;