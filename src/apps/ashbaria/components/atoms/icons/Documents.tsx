import React from 'react';
import documentsSvg from "../../../assets/documents.svg";
import { Box } from '@mui/material';

const DocumentsIcon = ({ size = 90 }) => {
  return (
    <Box
      component="img"
      src={documentsSvg}
      sx={{
        width: size,
      }}
    />
  );
};

export default DocumentsIcon;