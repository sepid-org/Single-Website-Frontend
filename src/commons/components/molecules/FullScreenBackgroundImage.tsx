import { Stack } from '@mui/material';
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
    <Stack
      alignItems={'center'}
      justifyContent={'center'}
      position={'relative'}
      padding={4}
      minHeight={'100vh'}
      minWidth={"100vw"}
      sx={{
        backgroundImage: image ? `url(${image})` : null,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        ...styles,
      }}
    >
      {children}
    </Stack>
  );
}

export default FullScreenBackgroundImage;
