import { Grid } from '@mui/material';
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import InfoIcon from '@mui/icons-material/Info';
import BarChartIcon from '@mui/icons-material/BarChart';
import Layout from 'commons/template/Layout';
import { DashboardTabType } from 'commons/types/global';
import Dashboard from 'commons/components/organisms/Dashboard';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import ArticlePaperEditor from '../template/PaperEditor';
import Info from '../template/Info';
import Statistics from '../template/Statistics copy';

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
    icon: SupervisorAccountIcon,
    component: <ArticlePaperEditor />,
  },
  {
    slug: 'statistics',
    label: 'آمار',
    icon: BarChartIcon,
    component: <Statistics />,
  },
]

type PropsType = {}

const ArticleManagement: FC<PropsType> = ({ }) => {
  const articleId = parseInt(useParams().articleId);

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

export default ArticleManagement;