import React from 'react';
import EditableBoxWidget from './edit';
import { Box } from '@mui/material';
export { EditableBoxWidget };

const BoxWidget = ({ }) => {
  return (
    <Box width={'100%'} height={'100%'} sx={{ backgroundColor: 'gray' }} />
  );
};

export default BoxWidget;
