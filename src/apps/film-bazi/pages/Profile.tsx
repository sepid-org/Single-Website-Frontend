import React, { FC, Fragment } from 'react';
import { DashboardTabType } from 'commons/types/global';
import UserSetting from 'commons/template/Setting/UserSetting';
import Dashboard from 'commons/components/organisms/Dashboard';
import { Container, Paper } from '@mui/material';
import AppBarComponent from '../components/organisms/Appbar';
import MyAssets from '../components/template/MyAssets';

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
    </Fragment>
  );
};

export default Profile;