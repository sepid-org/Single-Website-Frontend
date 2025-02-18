import React from 'react';

import DashboardButton from '../components/DashboardButton';
import { useGetPageMetadataQuery } from 'apps/website-display/redux/features/WebsiteSlice';
import WebsiteLogo from 'commons/components/atoms/logos/WebsiteLogo';
import DefaultAppbarItems from './DefaultAppbarItems';
import UserInfo from '../components/UserInfo';
import { useSelector } from 'react-redux';
import NotificationButton from 'apps/chat/components/atoms/NotificationButton';
import useUserAuthentication from 'commons/hooks/useUserAuthentication';

const DashboardAppbarItems = ({ }) => {
  const { data: pageMetadata } = useGetPageMetadataQuery({ pageAddress: window.location.pathname });
  const { isAuthenticated } = useUserAuthentication();

  if (!pageMetadata?.appbar?.body) {
    return DefaultAppbarItems({})
  }

  const desktopLeftItems = [];
  pageMetadata.appbar.body.desktopLeftItems.filter(item => item.position === 'left').forEach((item, index) => {
    desktopLeftItems.push(
      <DashboardButton key={index} label={item.label} to={item.to} items={item.items} />
    );
  })
  const desktopRightItems = [];
  pageMetadata.appbar.body.desktopLeftItems.filter(item => item.position === 'right').forEach((item, index) => {
    desktopRightItems.push(
      <DashboardButton key={index} label={item.label} to={item.to} items={item.items} />
    );
  })
  const websiteLogo = <WebsiteLogo />;
  const userInfo = <UserInfo />
  const notificationButton = <NotificationButton />

  return {
    desktopLeftItems: [
      ...desktopLeftItems,
      userInfo,
      isAuthenticated ? notificationButton : null,
    ],
    desktopRightItems: [
      websiteLogo,
      ...desktopRightItems,
    ],
    mobileLeftItems: [
      userInfo,
      isAuthenticated ? notificationButton : null,
    ],
    mobileRightItems: [],
    mobileMenuListItems: [
      ...desktopLeftItems,
      ...desktopRightItems,
    ],
  };
};

export default DashboardAppbarItems;
