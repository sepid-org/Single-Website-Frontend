import { Button } from '@mui/material';
import React, { FC } from 'react';

import useFinishFSM from 'commons/hooks/useFinishFSM';

type FinishFSMButtonPropsType = {}

const FinishFSMButton: FC<FinishFSMButtonPropsType> = ({ }) => {
  const [finishFSM] = useFinishFSM();

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