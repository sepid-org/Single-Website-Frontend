import React, { FC, Fragment } from 'react';
import { Typography, useMediaQuery, useTheme } from '@mui/material';
import { EditPaper } from '../Paper';

type BoardStateEditorPropsType = {
  fsmStateId: string;
}

const BoardStateEditor: FC<BoardStateEditorPropsType> = ({ fsmStateId }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (isMobile) {
    return (
      <Typography textAlign={'center'} padding={2}>
        {'ویرایش این گام در تلفن همراه امکان‌پذیر نیست :('}
      </Typography>
    )
  }

  return (
    <EditPaper template='board' paperId={fsmStateId} />
  );
};

export default BoardStateEditor;