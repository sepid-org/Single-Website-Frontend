import React, { FC } from 'react';
import Layout from 'commons/components/template/Layout';
import { DashboardTabType } from 'commons/types/global';
import UserSetting from 'commons/components/template/Setting/UserSetting';
import SchoolSetting from 'commons/components/template/Setting/SchoolSetting';
import UniversitySetting from 'commons/components/template/Setting/UniversitySetting';
import Dashboard from 'commons/components/organisms/Dashboard';

let tabs: DashboardTabType[] = [
  {
    slug: 'user',
    label: 'اطلاعات فردی',
    icon: '',
    component: UserSetting,
    disabled: false,
  },
  {
    slug: 'school',
    label: 'اطلاعات دانش‌آموزی',
    icon: '',
    component: SchoolSetting,
    disabled: false,
  },
  {
    slug: 'university',
    label: 'اطلاعات دانشجویی',
    icon: '',
    component: UniversitySetting,
    disabled: true,
  },
];

type SettingPropsType = {}

const Setting: FC<SettingPropsType> = ({ }) => {

  return (
    <Layout appbarMode={'DASHBOARD'}>
      <Dashboard tabs={tabs} />
    </Layout>
  );
};

export default Setting;