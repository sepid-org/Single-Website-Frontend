import React, { FC } from 'react';
import ClassIcon from '@mui/icons-material/Class';
import InfoIcon from '@mui/icons-material/Info';
import BarChartIcon from '@mui/icons-material/BarChart';
import ExtensionIcon from '@mui/icons-material/Extension';
import VisibilityIcon from '@mui/icons-material/Visibility';

import Layout from 'commons/template/Layout';
import WebsiteInfoTab from '../components/template/website-management/Info';
import ProgramsTab from '../components/template/website-management/Programs';
import StatisticsTab from '../components/template/website-management/Statistics';
import ArticlesTab from '../components/template/website-management/Articles';
import ThirdPartiesTab from '../components/template/website-management/ThirdParties';
import AppearanceTab from '../components/template/website-management/Appearance';
import { DashboardTabType } from 'commons/types/global';
import Dashboard from 'commons/components/organisms/Dashboard';

const tabs: DashboardTabType[] = [
  {
    slug: 'info',
    label: 'اطلاعات کلی',
    icon: InfoIcon,
    component: <WebsiteInfoTab />,
  },
  {
    slug: 'programs',
    label: 'دوره‌ها',
    icon: ClassIcon,
    component: <ProgramsTab />,
  },
  {
    slug: 'articles',
    label: 'مقاله‌ها',
    icon: ClassIcon,
    component: <ArticlesTab />,
  },
  {
    slug: 'third-parties',
    label: 'افزونه‌ها',
    icon: ExtensionIcon,
    component: <ThirdPartiesTab />,
    disabled: true,
  },
  {
    slug: 'appearance',
    label: 'تنظیمات ظاهری',
    icon: VisibilityIcon,
    component: <AppearanceTab />,
    disabled: false,
  },
  {
    slug: 'statistics',
    label: 'آمارها',
    icon: BarChartIcon,
    component: <StatisticsTab />,
    disabled: true,
  },
];

type WebsiteManagementPropsType = {}

const WebsiteManagement: FC<WebsiteManagementPropsType> = ({ }) => {

  return (
    <Layout appbarMode='WEBSITE'>
      <Dashboard tabs={tabs} returnDirection='/' />
    </Layout>
  );
};

export default WebsiteManagement;
