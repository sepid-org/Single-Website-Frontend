import { Box } from '@mui/material';
import React, { FC, ReactNode } from 'react';


type FullScreenBackgroundImagePropsType = {
  image: any;
  children: ReactNode;
}

const FullScreenBackgroundImage: FC<FullScreenBackgroundImagePropsType> = ({
  image,
  children,
}) => {

  return (
    <Box
      position={'relative'}
      sx={{
        minHeight: "100vh",
        minWidth: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {children}
    </Box>
  );
}

export default FullScreenBackgroundImage;
