import React from 'react';
import documentSvg from "../../../assets/documents.svg";
import { Box } from '@mui/material';

const DocumentIcon = (props) => {
  return (
    <Box
      component="img"
      src={documentSvg}
      sx={{
        width: 200,
        // height: 100,
      }}
    />
  );
};

export default DocumentIcon;