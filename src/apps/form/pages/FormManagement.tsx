import { Grid } from '@mui/material';
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import InfoIcon from '@mui/icons-material/Info';
import BarChartIcon from '@mui/icons-material/BarChart';
import Layout from 'commons/template/Layout';
import { DashboardTabType } from 'commons/types/global';
import Dashboard from 'commons/components/organisms/Dashboard';
import WidgetsIcon from '@mui/icons-material/Widgets';
import FormPaperEditor from '../template/FormPaperEditor';
import Info from '../template/Info';
import Statistics from '../template/Statistics';
import PersonIcon from '@mui/icons-material/Person';
import Responses from '../template/Responses';

const tabs: DashboardTabType[] = [
  {
    slug: 'info',
    label: 'اطلاعات کلی',
    icon: InfoIcon,
    component: <Info />,
  },
  {
    slug: 'widgets',
    label: 'ویجت‌ها',
    icon: WidgetsIcon,
    component: <FormPaperEditor />,
  },
  {
    slug: 'responses',
    label: 'پاسخ‌ها',
    icon: PersonIcon,
    component: <Responses />,
  },
  {
    slug: 'statistics',
    label: 'آمار',
    icon: BarChartIcon,
    component: <Statistics />,
  },
]

type PropsType = {}

const FormManagement: FC<PropsType> = ({ }) => {
  const formId = parseInt(useParams().formId);

  return (
    <Layout appbarMode='GENERAL'>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <Dashboard tabs={tabs} returnDirection={'/'} />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default FormManagement;