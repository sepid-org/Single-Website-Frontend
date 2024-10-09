import GroupsIcon from '@mui/icons-material/Groups';
import ClassIcon from '@mui/icons-material/Class';
import PaymentsIcon from '@mui/icons-material/Payments';
import PeopleIcon from '@mui/icons-material/People';
import ArticleIcon from '@mui/icons-material/Article';
import InfoIcon from '@mui/icons-material/Info';
import BarChartIcon from '@mui/icons-material/BarChart';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import PersonIcon from '@mui/icons-material/Person';

import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

import Layout from 'commons/template/Layout';
import Tickets from 'commons/template/program/management/Tickets';
import Info from 'commons/template/program/management/Info';
import Registration from 'commons/template/program/management/Registration';
import RegistrationReceipts from 'commons/template/program/management/RegistrationReceipts';
import Teams from 'commons/template/program/management/Teams';
import FSMs from 'commons/template/program/management/FSMs';
import StatisticsTab from 'commons/template/program/management/Statistics';
import Certificates from 'commons/template/program/management/Certificates';
import { DashboardTabType } from 'commons/types/global';
import Admins from 'commons/template/program/management/Admins';
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
    slug: 'tickets',
    label: 'بلیط‌ها',
    icon: PaymentsIcon,
    component: <Tickets />,
  },
  {
    slug: 'registration-receipts',
    label: 'شرکت‌کنندگان',
    icon: PeopleIcon,
    component: <RegistrationReceipts />,
  },
  {
    slug: 'certificates',
    label: 'گواهی‌ها',
    icon: WorkspacePremiumIcon,
    component: <Certificates />,
    disabled: true,
  },
  {
    slug: 'mentors',
    label: 'مدیران',
    icon: PersonIcon,
    component: <Admins />,
  },
  {
    slug: 'teams',
    label: 'تیم‌ها',
    icon: GroupsIcon,
    component: <Teams />,
  },
  {
    slug: 'fsms',
    label: 'کارگاه‌ها',
    icon: ClassIcon,
    component: <FSMs />,
  },
  {
    slug: 'statistics',
    label: 'آمارها',
    icon: BarChartIcon,
    component: <StatisticsTab />,
  },
];

type ProgramManagementPropsType = {}

const ProgramManagement: FC<ProgramManagementPropsType> = ({ }) => {
  const { programSlug } = useParams();

  return (
    <Layout appbarMode='GENERAL'>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} marginTop={-1}>
          <ProgramManagementBreadcrumbs />
        </Grid>
        <Grid item xs={12}>
          <Dashboard tabs={tabs} returnDirection={`/program/${programSlug}/`} />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default ProgramManagement;