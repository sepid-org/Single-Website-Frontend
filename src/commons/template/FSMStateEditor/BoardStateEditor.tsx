import React, { FC, Fragment, useState } from 'react';
import { Typography, useMediaQuery, useTheme } from '@mui/material';
import { PaperEditor } from '../Paper';
import { useGetFSMStateQuery } from 'apps/fsm/redux/slices/fsm/FSMStateSlice';
import { useFSMStateContext } from 'commons/hooks/useFSMStateContext';
import PapersMenu from 'commons/components/organisms/PapersMenu';

type BoardStateEditorPropsType = {}

const BoardStateEditor: FC<BoardStateEditorPropsType> = ({ }) => {
  const theme = useTheme();
  const { fsmStateId } = useFSMStateContext();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { data } = useGetFSMStateQuery({ fsmStateId });
  // todo: all papers should be displayed
  const paperId = data.papers[0]
  const [currentPaperId, setCurrentPaperId] = useState<string>('');

  if (isMobile) {
    return (
      <Typography textAlign={'center'} padding={2}>
        {'ویرایش این گام در تلفن همراه امکان‌پذیر نیست :('}
      </Typography>
    )
  }

  // bill
  return (
    <Fragment>
      <PapersMenu currentPaperId='' setCurrentPaperId={undefined} papers={[]} />
      <PaperEditor template='board' paperId={paperId} />
    </Fragment>
  );
};

export default BoardStateEditor;