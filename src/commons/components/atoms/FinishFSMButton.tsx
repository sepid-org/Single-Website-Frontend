import { Button } from '@mui/material';
import React, { FC } from 'react';

import useFinishFSM from 'commons/hooks/fsm/useFinishFSM';

type PropsType = {}

const FinishFSMButton: FC<PropsType> = ({ }) => {
  const [finishFSM] = useFinishFSM();

  return (
    <Button
      fullWidth
      variant="contained"
      color="primary"
      onClick={() => finishFSM()}>
      {'پایان'}
    </Button>
  )
}


export default FinishFSMButton;