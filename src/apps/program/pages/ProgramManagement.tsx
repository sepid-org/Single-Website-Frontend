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
import Tickets from 'apps/program/template/management/Tickets';
import Info from 'apps/program/template/management/Info';
import Registration from 'apps/program/template/management/Registration';
import RegistrationReceipts from 'apps/program/template/management/RegistrationReceipts';
import Teams from 'apps/program/template/management/Teams';
import FSMsManagement from 'apps/program/template/management/FSMs';
import StatisticsTab from 'apps/program/template/management/Statistics';
import Certificates from 'apps/program/template/management/Certificates';
import { DashboardTabType } from 'commons/types/global';
import Admins from 'apps/program/template/management/Admins';
import Dashboard from 'commons/components/organisms/Dashboard';
import ProgramManagementBreadcrumbs from 'commons/components/organisms/breadcrumbs/ProgramManagement';
import { Grid } from '@mui/material';
import MeetingsManagement from '../template/management/Meetings';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';

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
    disabled: false,
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
    slug: 'meetings',
    label: 'جلسه‌ها',
    icon: MeetingRoomIcon,
    component: <MeetingsManagement />,
  },
  {
    slug: 'fsms',
    label: 'کارگاه‌ها',
    icon: ClassIcon,
    component: <FSMsManagement />,
  },
  {
    slug: 'statistics',
    label: 'آمار',
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