import React from 'react';
import EditablePlaceholder from './edit';
import { Skeleton } from '@mui/material';
export { EditablePlaceholder };

const Placeholder = ({ }) => {
  return (
    <Skeleton variant='rounded' width={'100%'} height={'100%'} />
  );
};

export default Placeholder;
