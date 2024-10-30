import { Button } from '@mui/material';
import React, { FC } from 'react';

import useFinishFSM from 'commons/hooks/useFinishFSM';
import { useParams } from 'react-router-dom';

type FinishFSMButtonPropsType = {}

const FinishFSMButton: FC<FinishFSMButtonPropsType> = ({ }) => {
  const { fsmId } = useParams();
  const [finishFSM] = useFinishFSM({ fsmId });

  return (
    <Button
      fullWidth
      variant="contained"
      color="primary"
      onClick={finishFSM}>
      {'اتمام کارگاه'}
    </Button>
  )
}


export default FinishFSMButton;