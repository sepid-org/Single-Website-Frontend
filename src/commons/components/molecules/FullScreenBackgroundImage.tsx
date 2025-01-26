import { Box } from '@mui/material';
import React, { FC, ReactNode } from 'react';


type FullScreenBackgroundImagePropsType = {
  image?: string;
  children: ReactNode;
  styles?: any;
}

const FullScreenBackgroundImage: FC<FullScreenBackgroundImagePropsType> = ({
  image,
  children,
  styles,
}) => {

  return (
    <Box
      position={'relative'}
      sx={{
        padding: 4,
        minHeight: "100vh",
        minWidth: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: image ? `url(${image})` : null,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        ...styles,
      }}
    >
      {children}
    </Box>
  );
}

export default FullScreenBackgroundImage;
