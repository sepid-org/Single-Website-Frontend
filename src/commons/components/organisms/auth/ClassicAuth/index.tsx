import React, { FC, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import LoginTab from './LoginTab';
import CreateAccountTab from './CreateAccountTab';
import ResetPasswordTab from './ResetPasswordTab';
import { toast } from 'react-toastify';

const tabsMap = {
  'login': LoginTab,
  'create-account': CreateAccountTab,
  'reset-password': ResetPasswordTab,
  'token-expiration': LoginTab,
} as const;

type TabName = keyof typeof tabsMap;

type PropsType = {};

const ClassicAuthTabs: FC<PropsType> = () => {
  const [searchParams] = useSearchParams();
  const currentTab = (searchParams.get('tab') as TabName);

  const TabComponent = tabsMap[currentTab] ?? LoginTab;

  useEffect(() => {
    if (currentTab === 'token-expiration') {
      toast.info('نشست شما به پایان رسیده. لطفاً دوباره وارد سامانه شوید');
    }
  }, []);

  return (
    <TabComponent />
  );
};

export default ClassicAuthTabs;
