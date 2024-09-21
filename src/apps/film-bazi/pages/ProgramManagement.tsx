import PeopleIcon from '@mui/icons-material/People';
import ArticleIcon from '@mui/icons-material/Article';
import InfoIcon from '@mui/icons-material/Info';
import PersonIcon from '@mui/icons-material/Person';
import React, { FC, Fragment } from 'react';

import Info from 'commons/components/template/program/management/Info';
import Registration from 'commons/components/template/program/management/Registration';
import RegistrationReceipts from 'commons/components/template/program/management/RegistrationReceipts';
import { DashboardTabType } from 'commons/types/global';
import Admins from 'commons/components/template/program/management/Admins';
import Dashboard from 'commons/components/organisms/Dashboard';
import { Container } from '@mui/material';
import AppBarComponent from '../components/organisms/Appbar';

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

export default ProgramManagement;