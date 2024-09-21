import React, { FC, Fragment } from 'react';
import { DashboardTabType } from 'commons/types/global';
import UserSetting from 'commons/components/template/Setting/UserSetting';
import Dashboard from 'commons/components/organisms/Dashboard';
import { useParams } from 'react-router-dom';
import { Container, Paper } from '@mui/material';
import AppBarComponent from '../components/organisms/Appbar';

const paperWrappedComponent = (component) => {
  return (
    <Paper sx={{ padding: 2 }}>
      {component}
    </Paper>
  )
}

let tabs: DashboardTabType[] = [
  {
    slug: 'user',
    label: 'مشخصات',
    component: paperWrappedComponent(<UserSetting />),
    disabled: false,
  },
];

type ProfilePropsType = {}

const Profile: FC<ProfilePropsType> = ({ }) => {
  const { programSlug } = useParams();

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
        <Dashboard tabs={tabs} returnDirection={`/program/${programSlug}/`} />
      </Container>
    </Fragment>
  );
};

export default Profile;