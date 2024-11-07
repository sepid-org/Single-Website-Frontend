import React, { FC } from 'react';
import { Box } from '@mui/material';
import AppBarComponent from '../organisms/Appbar';
import backgroundImg from "../../assets/dashboardBackground.svg";

type PropsType = {
  backgroundImage?: any;
  children: React.ReactNode;
}

const FilmbaziLayout: FC<PropsType> = ({ children, backgroundImage }) => {

  return (
    <Box
      sx={{
        backgroundImage: `url(${backgroundImage || backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: 'left',
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        minHeight: '100vh',
        minWidth: "100vw",
        paddingTop: 12,
      }}
    >
      <AppBarComponent />
      {children}
    </Box>
  );
};

export default FilmbaziLayout;