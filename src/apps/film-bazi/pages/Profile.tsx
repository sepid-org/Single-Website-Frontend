import React, { FC } from 'react';
import Layout from 'commons/components/template/Layout';
import { DashboardTabType } from 'commons/types/global';
import UserSetting from 'commons/components/template/Setting/UserSetting';
import SchoolSetting from 'commons/components/template/Setting/SchoolSetting';
import UniversitySetting from 'commons/components/template/Setting/UniversitySetting';
import Dashboard from 'commons/components/organisms/Dashboard';
import { useParams } from 'react-router-dom';
import { Paper } from '@mui/material';

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
    <Layout appbarMode={'DASHBOARD'}>
      <Dashboard tabs={tabs} returnDirection={`/program/${programSlug}/`} />
    </Layout>
  );
};

export default Profile;