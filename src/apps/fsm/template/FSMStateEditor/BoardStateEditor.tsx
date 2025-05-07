import React, { FC, useState } from 'react';
import { Divider, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import FSMStatePapersList from 'apps/fsm/components/molecules/FSMStatePapersList';
import BoardEditor from 'commons/template/BoardEditor';
import AddPaperToFSMState from 'apps/fsm/components/molecules/AddPaperToFSMState';
import { useGetFSMStateQuery } from 'apps/fsm/redux/slices/fsm/FSMStateSlice';

type BoardStateEditorPropsType = {
  fsmStateId: string;
}

const BoardStateEditor: FC<BoardStateEditorPropsType> = ({ fsmStateId }) => {
  const theme = useTheme();
  const [activePaperId, setActivePaperId] = useState(null);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { data: fsmState } = useGetFSMStateQuery({ fsmStateId });

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
        <FSMStatePapersList
          activePaperId={activePaperId}
          setActivePaperId={setActivePaperId}
          paperIds={fsmState?.papers}
          fsmStateId={fsmStateId}
        />
      </Grid>
      <Divider orientation='vertical' flexItem />
      <Grid item md={9}>
        <BoardEditor
          activePaperId={activePaperId}
          backgroundPaperIds={fsmState?.papers.filter((paperId) => paperId !== activePaperId)}
        />
      </Grid>
    </Grid>
  );
};

export default BoardStateEditor;