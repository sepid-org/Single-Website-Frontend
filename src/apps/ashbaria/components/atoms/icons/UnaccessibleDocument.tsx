import React from 'react';
import UnaccessibleDocumentSVG from "../../../assets/unaccessible-document.svg";
import { Box } from '@mui/material';

const UnaccessibleDocumentIcon = ({ size = 34 }) => {
  return (
    <Box
      component="img"
      src={UnaccessibleDocumentSVG}
      sx={{
        width: size,
      }}
    />
  );
};

export default UnaccessibleDocumentIcon;