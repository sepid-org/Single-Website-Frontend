import { Grid, Button, ButtonGroup } from '@mui/material';
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

  const handleTabChange = (newValue: string) => {
    setSearchParams({ tab: newValue });
  };

  const handleReturnClick = () => {
    navigate(returnDirection);
  };

  const currentTab: DashboardTabType = tabs.find(tab => tab.slug === currentTabSlug);

  return (
    <Grid container alignItems={'start'} spacing={2}>
      <Grid item xs={12} sm={3}>
        <ButtonGroup
          orientation="vertical"
          fullWidth
        >
          {tabs.map((tab) => (
            <Button
              key={tab.slug}
              onClick={() => handleTabChange(tab.slug)}
              startIcon={tab.icon && <tab.icon />}
              disabled={tab.disabled}
              variant={tab.slug === currentTabSlug ? 'contained' : 'outlined'}
            >
              {tab.label}
            </Button>
          ))}
        </ButtonGroup>
        {returnDirection && (
          <Button
            sx={{ marginTop: 2 }}
            fullWidth
            onClick={handleReturnClick}
            startIcon={<ExitToAppIcon />}
            variant="outlined"
          >
            {'بازگشت'}
          </Button>
        )}
      </Grid>
      <Grid item xs={12} sm={9}>
        {currentTab.component}
      </Grid>
    </Grid>
  );
};

export default Dashboard;
