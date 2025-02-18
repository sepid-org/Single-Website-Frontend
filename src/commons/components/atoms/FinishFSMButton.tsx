import { Button } from '@mui/material';
import React, { FC } from 'react';

import useFinishFSM from 'commons/hooks/fsm/useFinishFSM';
import { useParams } from 'react-router-dom';

type FinishFSMButtonPropsType = {}

const FinishFSMButton: FC<FinishFSMButtonPropsType> = ({ }) => {
  const fsmId = parseInt(useParams().fsmId);
  const [finishFSM] = useFinishFSM({ fsmId });

  return (
    <Button
      fullWidth
      variant="contained"
      color="primary"
      onClick={finishFSM}>
      {'پایان'}
    </Button>
  )
}


export default FinishFSMButton;