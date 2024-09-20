import PeopleIcon from '@mui/icons-material/People';
import ArticleIcon from '@mui/icons-material/Article';
import InfoIcon from '@mui/icons-material/Info';
import PersonIcon from '@mui/icons-material/Person';

import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

import Layout from 'commons/components/template/Layout';
import Info from 'commons/components/template/program/management/Info';
import Registration from 'commons/components/template/program/management/Registration';
import RegistrationReceipts from 'commons/components/template/program/management/RegistrationReceipts';
import { DashboardTabType } from 'commons/types/global';
import Admins from 'commons/components/template/program/management/Admins';
import Dashboard from 'commons/components/organisms/Dashboard';
import ProgramManagementBreadcrumbs from 'commons/components/organisms/breadcrumbs/ProgramManagement';
import { Grid } from '@mui/material';

const tabs: DashboardTabType[] = [
  {
    slug: 'info',
    label: 'اطلاعات کلی',
    icon: InfoIcon,
    component: <Info />,
  },
  {
    slug: 'registration-form',
    label: 'فرایند ثبت‌نام',
    icon: ArticleIcon,
    component: <Registration />,
  },
  {
    slug: 'registration-receipts',
    label: 'شرکت‌کنندگان',
    icon: PeopleIcon,
    component: <RegistrationReceipts />,
  },
  {
    slug: 'mentors',
    label: 'مدیران',
    icon: PersonIcon,
    component: <Admins />,
  },
];

type ProgramManagementPropsType = {}

const ProgramManagement: FC<ProgramManagementPropsType> = ({ }) => {
  const { programSlug } = useParams();

  return (
    <Layout appbarMode='GENERAL'>
      <Dashboard tabs={tabs} returnDirection={`/program/${programSlug}/`} />
    </Layout>
  );
};

export default ProgramManagement;