import React, { FC, Fragment } from 'react';
import { Container } from '@mui/material';

import AppBar from 'commons/components/organisms/Appbar';
import { AppbarModes } from 'commons/types/global';

type LayoutPropsType = {
  appbarMode: AppbarModes;
  appbarPosition?: "fixed" | "absolute" | "sticky" | "static" | "relative";
  children: any;
}

const Layout: FC<LayoutPropsType> = ({
  appbarMode = 'DASHBOARD',
  children,
}) => {

  return (
    <Fragment>
      {appbarMode && <AppBar mode={appbarMode} position={'fixed'} />}
      <Container maxWidth='lg'
        sx={{
          display: 'flex',
          marginTop: { xs: 10, sm: 11 },
          marginBottom: 2,
          justifyContent: 'center',
          marginRight: 'auto !important',
          marginLeft: 'auto !important',
        }}>
        {children}
      </Container>
    </Fragment>
  );
};


export default Layout;