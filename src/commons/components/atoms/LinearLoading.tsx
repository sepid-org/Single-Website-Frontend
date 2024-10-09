import { LinearProgress } from '@mui/material';
import React, { FC } from 'react';

type LinearLoadingPropsType = {
  loading: boolean;
}

const LinearLoading: FC<LinearLoadingPropsType> = ({
  loading
}) => {
  if (loading) {
    return (
      <div style={{ width: '100vw', position: 'fixed', top: '0px', zIndex: '99999' }}>
        <LinearProgress />
      </div>
    )
  } else {
    return (null)
  }
};


export default LinearLoading;




