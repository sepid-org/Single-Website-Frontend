import React, { FC, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LoginTab from './LoginTab';
import CreateAccountTab from './CreateAccountTab';
import ResetPasswordTab from './ResetPasswordTab';
import { Typography } from '@mui/material';
import { toast } from 'react-toastify';

const tabsMap = {
  'login': LoginTab,
  'create-account': CreateAccountTab,
  'reset-password': ResetPasswordTab,
  'token-expiration': LoginTab,
} as const;

type TabName = keyof typeof tabsMap;

type PropsType = {
  basePath?: string;
}

const AuthTabs: FC<PropsType> = ({
  basePath = '/',
}) => {
  const { tabName } = useParams<{ tabName?: string }>();
  const navigate = useNavigate();
  const currentTab = (tabName as TabName) || 'login';
  const TabComponent = tabsMap[currentTab]!;

  useEffect(() => {
    const isUserTokenExpired = window.location.href.includes('token-expiration');
    if (isUserTokenExpired) {
      toast.info('نشست شما به پایان رسیده. لطفاً دوباره وارد سامانه شوید');
    }
  }, [])

  const setTabName = (next: TabName) => {
    if (next !== currentTab) {
      navigate(`${basePath}/${next}`, { replace: true });
    }
  };

  return (
    <>
      {TabComponent ?
        <TabComponent setTab={setTabName} /> :
        <Typography variant="h6" color="error">
          Invalid tab specified
        </Typography>
      }
    </>
  );
};

export default AuthTabs;
