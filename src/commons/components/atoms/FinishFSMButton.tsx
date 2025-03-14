import { Button } from '@mui/material';
import React, { FC, useEffect } from 'react';

import useFinishFSM from 'commons/hooks/fsm/useFinishFSM';
import { useNavigate, useParams } from 'react-router-dom';

type PropsType = {}

const FinishFSMButton: FC<PropsType> = ({ }) => {
  const navigate = useNavigate();
  const fsmId = parseInt(useParams().fsmId);
  const [finishFSM, finishFSMResult] = useFinishFSM();

  useEffect(() => {
    if (finishFSMResult.isSuccess) {
      navigate(`/fsm/${fsmId}/player-performance/`);
    }
  }, [finishFSMResult])

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