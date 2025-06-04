import { Grid } from '@mui/material';
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import TimelineIcon from '@mui/icons-material/Timeline';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import InfoIcon from '@mui/icons-material/Info';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import BarChartIcon from '@mui/icons-material/BarChart';
import Layout from 'commons/template/Layout';
import States from 'apps/fsm/template/States';
import Edges from 'apps/fsm/template/Edges';
import Statistics from 'apps/fsm/template/Statistics';
import IndividualRequests from 'apps/fsm/template/IndividualRequests';
import Info from 'apps/fsm/template/Info';
import TeamRequests from 'apps/fsm/template/TeamRequests';
import Mentors from 'apps/fsm/template/Mentors';
import { DashboardTabType } from 'commons/types/global';
import { useGetFSMQuery } from 'apps/fsm/redux/slices/fsm/FSMSlice';
import FSMManagementBreadcrumbs from 'commons/components/organisms/breadcrumbs/FSMManagement';
import Dashboard from 'commons/components/organisms/Dashboard';
import MapIcon from '@mui/icons-material/Map';
import FSMMapEditor from '../template/FSMMapEditor';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import Players from '../template/Players';

const initialTabs: DashboardTabType[] = [
  {
    slug: 'info',
    label: 'اطلاعات کلی',
    icon: InfoIcon,
    component: <Info />,
  },
  // {
  //   slug: 'fsm-map',
  //   label: 'نقشه',
  //   icon: MapIcon,
  //   component: <FSMMapEditor />,
  // },
  {
    slug: 'states',
    label: 'گام‌ها',
    icon: DesignServicesIcon,
    component: <States />,
  },
  {
    slug: 'edges',
    label: 'یال‌ها',
    icon: TimelineIcon,
    component: <Edges />,
  },
  {
    slug: 'players',
    label: 'شرکت‌کنندگان',
    icon: PersonIcon,
    component: <Players />,
    disabled: false,
  },
  {
    slug: 'mentors',
    label: 'همیارها',
    icon: SupervisorAccountIcon,
    component: <Mentors />,
  },
  // {
  //   slug: 'correction',
  //   label: 'تصحیح',
  //   icon: BorderColorIcon,
  //   component: <GoToAnswer />,
  //   disabled: false,
  // },
  {
    slug: 'statistics',
    label: 'آمار',
    icon: BarChartIcon,
    component: <Statistics />,
  },
]

type FSMManagementPropsType = {}

const FSMManagement: FC<FSMManagementPropsType> = ({ }) => {
  const fsmId = parseInt(useParams().fsmId);
  const { data: fsm } = useGetFSMQuery({ fsmId });

  const tabs: DashboardTabType[] =
    (fsm && fsm.id == fsmId && fsm.fsm_learning_type == 'Supervised') ?
      (fsm.fsm_p_type == 'Team') ?
        [
          ...initialTabs,
          {
            slug: 'requests',
            label: 'درخواست‌ها',
            icon: QuestionAnswerIcon,
            component: <TeamRequests />,
          },
        ] :
        (fsm.fsm_p_type == 'Individual') ?
          [
            ...initialTabs,
            {
              slug: 'requests',
              label: 'درخواست‌ها',
              icon: QuestionAnswerIcon,
              component: <IndividualRequests />,
            },
          ] :
          initialTabs :
      initialTabs

  return (
    <Layout appbarMode='GENERAL'>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} marginTop={-1}>
          <FSMManagementBreadcrumbs />
        </Grid>
        <Grid item xs={12}>
          <Dashboard tabs={tabs} returnDirection={fsm && `/program/${fsm.program_slug}/`} />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default FSMManagement;