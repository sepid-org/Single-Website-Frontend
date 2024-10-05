import React, { FC, Fragment } from 'react';
import { DashboardTabType } from 'commons/types/global';
import UserSetting from 'commons/template/Setting/UserSetting';
import Dashboard from 'commons/components/organisms/Dashboard';
import { Box, Container, Paper } from '@mui/material';
import AppBarComponent from '../components/organisms/Appbar';
import MyAssets from '../components/template/MyAssets';
import backgroundImg from "../assets/dashboardBackground.svg";

let tabs: DashboardTabType[] = [
  {
    slug: 'assets',
    label: 'دارایی‌ها',
    component: <MyAssets />,
    disabled: false,
  },
  {
    slug: 'user',
    label: 'اطلاعات فردی',
    component: <UserSetting />,
    disabled: false,
  },
];

type ProfilePropsType = {}

const Profile: FC<ProfilePropsType> = ({ }) => {

  return (
    <Fragment>
      <Box
        sx={{
          backgroundImage: `url(${backgroundImg})`,
          backgroundSize: "cover",
          backgroundPosition: 'left',
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          minHeight: '100vh',
          minWidth: "100vw",
        }}
      >
        <AppBarComponent />
        <Container maxWidth='lg'
          sx={{
            display: 'flex',
            paddingTop: 4,
            paddingBottom: 2,
            justifyContent: 'center',
            marginRight: 'auto !important',
            marginLeft: 'auto !important',
          }}>
          <Dashboard tabs={tabs} returnDirection={`/program/filmbazi/`} />
        </Container>
      </Box>
    </Fragment>
  );
};

export default Profile;