import React, { FC, Fragment } from 'react';
import PeopleIcon from '@mui/icons-material/People';
import ArticleIcon from '@mui/icons-material/Article';
import InfoIcon from '@mui/icons-material/Info';
import PersonIcon from '@mui/icons-material/Person';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import HelpIcon from '@mui/icons-material/Help';

import Info from 'commons/template/program/management/Info';
import Registration from 'commons/template/program/management/Registration';
import RegistrationReceipts from 'commons/template/program/management/RegistrationReceipts';
import { DashboardTabType } from 'commons/types/global';
import Admins from 'commons/template/program/management/Admins';
import Dashboard from 'commons/components/organisms/Dashboard';
import { Container } from '@mui/material';
import FSMs from 'commons/template/program/management/FSMs';
import CustomWidgetsManagement from './CustomWidgetsManagement';
import ScenariosManagement from './ScenariosManagement';

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
  {
    slug: 'fsms',
    label: 'کارگاه‌ها',
    icon: AccountBalanceIcon,
    component: <FSMs />,
  },
  {
    slug: 'questions',
    label: 'سوالات',
    icon: HelpIcon,
    component: <CustomWidgetsManagement />,
  },
  {
    slug: 'scenarios',
    label: 'سناریوها',
    icon: HelpIcon,
    component: <ScenariosManagement />,
  },
];

type ProgramManagementPropsType = {}

const ProgramManagement: FC<ProgramManagementPropsType> = ({ }) => {

  return (
    <Container maxWidth='lg'
      sx={{
        display: 'flex',
        paddingTop: 4,
        paddingBottom: 2,
        justifyContent: 'center',
        marginRight: 'auto !important',
        marginLeft: 'auto !important',
      }}>
      <Dashboard tabs={tabs} returnDirection={`/program/ashbaria/`} />
    </Container>
  );
};

export default ProgramManagement;