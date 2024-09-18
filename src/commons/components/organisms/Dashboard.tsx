import { Grid, Tab, Tabs } from '@mui/material';
import React, { FC } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { DashboardTabType } from 'commons/types/global';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

type DashboardPropsType = {
  tabs: DashboardTabType[];
  returnDirection?: string;
}

const Dashboard: FC<DashboardPropsType> = ({
  tabs,
  returnDirection,
}) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTabSlug = searchParams.get('tab') || tabs[0].slug;

  const handleTabChange = (event, newValue) => {
    if (tabs[newValue]) {
      setSearchParams({ tab: tabs[newValue].slug });
    }
  };

  const handleReturnClick = () => {
    navigate(returnDirection);
  };

  const currentTab: DashboardTabType = tabs.find(tab => tab.slug === currentTabSlug);

  return (
    <Grid container alignItems={'start'} spacing={2}>
      <Grid item xs={12} sm={3}>
        <Tabs
          orientation="vertical"
          variant="fullWidth"
          value={tabs.indexOf(currentTab)}
          onChange={handleTabChange}
          sx={{
            minWidth: '150px', // Adjust tab width
            '& .MuiTab-root': {
              minHeight: 45, // Adjust tab height
              fontSize: '1rem', // Adjust font size
              padding: '12px 24px', // Adjust padding
            }
          }}
        >
          {tabs.map((tab, index) => (
            <Tab
              icon={<tab.icon />}
              iconPosition="start"
              disabled={tab.disabled}
              key={index}
              label={tab.label}
            />
          ))}
          {returnDirection && (
            <Tab
              label={'بازگشت'}
              icon={<ExitToAppIcon />}
              iconPosition="start"
              value={false}
              onClick={handleReturnClick}
            />
          )}
        </Tabs>
      </Grid>
      <Grid item xs={12} sm={9}>
        <currentTab.component {...currentTab.componentProps} />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
