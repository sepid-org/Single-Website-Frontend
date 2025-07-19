import React from 'react';
import DocumentSVG from "../../../assets/document.svg";
import { Box } from '@mui/material';

const DocumentIcon = ({ size = 34 }) => {
  return (
    <Box
      component="img"
      src={DocumentSVG}
      sx={{
        width: size,
      }}
    />
  );
};

export default DocumentIcon;