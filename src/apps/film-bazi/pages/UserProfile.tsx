import React, { FC } from 'react';
import Layout from 'commons/components/template/Layout';
import { DashboardTabType } from 'commons/types/global';
import UserSetting from 'commons/components/template/Setting/UserSetting';
import SchoolSetting from 'commons/components/template/Setting/SchoolSetting';
import UniversitySetting from 'commons/components/template/Setting/UniversitySetting';
import Dashboard from 'commons/components/organisms/Dashboard';
import { useParams } from 'react-router-dom';

let tabs: DashboardTabType[] = [
  {
    slug: 'user',
    label: 'مشخصات',
    component: UserSetting,
    disabled: false,
  },
];

type UserProfilePropsType = {}

const UserProfile: FC<UserProfilePropsType> = ({ }) => {
  const { programSlug } = useParams();

  return (
    <Layout appbarMode={'DASHBOARD'}>
      <Dashboard tabs={tabs} returnDirection={`/program/${programSlug}/`} />
    </Layout>
  );
};

export default UserProfile;