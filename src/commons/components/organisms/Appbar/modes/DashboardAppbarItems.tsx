import React from 'react';
import DashboardButton from '../components/DashboardButton';
import { useGetPageMetadataQuery, useGetWebsiteQuery } from 'apps/website-display/redux/features/WebsiteSlice';
import WebsiteLogo from 'commons/components/atoms/logos/WebsiteLogo';
import UserInfo from '../components/UserInfo';
import NotificationButton from 'apps/chat/components/atoms/NotificationButton';
import useUserAuthentication from 'commons/hooks/useUserAuthentication';

const DashboardAppbarItems = ({ }) => {

  const { data: pageMetadata } = useGetPageMetadataQuery({ pageAddress: window.location.pathname });
  const { data: websiteData } = useGetWebsiteQuery();
  const { isUserAuthenticated } = useUserAuthentication();

  const desktopLeftItems = [];
  const desktopRightItems = [];

  if (pageMetadata?.appbar?.body) {
    pageMetadata.appbar.body.desktopLeftItems.filter(item => item.position === 'left').forEach((item, index) => {
      desktopLeftItems.push(
        <DashboardButton key={index} label={item.label} to={item.to} items={item.items} />
      );
    });
    pageMetadata.appbar.body.desktopLeftItems.filter(item => item.position === 'right').forEach((item, index) => {
      desktopRightItems.push(
        <DashboardButton key={index} label={item.label} to={item.to} items={item.items} />
      );
    });
  } else {
    websiteData.appbar.body.desktopLeftItems.filter(item => item.position === 'left').forEach((item, index) => {
      desktopLeftItems.push(
        <DashboardButton key={index} label={item.label} to={item.to} items={item.items} />
      );
    });
    websiteData.appbar.body.desktopLeftItems.filter(item => item.position === 'right').forEach((item, index) => {
      desktopRightItems.push(
        <DashboardButton key={index} label={item.label} to={item.to} items={item.items} />
      );
    });
  }

  const websiteLogo = <WebsiteLogo />;
  const userInfo = <UserInfo />
  const notificationButton = <NotificationButton />

  return {
    desktopLeftItems: [
      ...desktopLeftItems,
      userInfo,
      isUserAuthenticated ? notificationButton : null,
    ],
    desktopRightItems: [
      websiteLogo,
      ...desktopRightItems,
    ],
    mobileLeftItems: [
      userInfo,
      isUserAuthenticated ? notificationButton : null,
    ],
    mobileRightItems: [],
    mobileMenuListItems: [
      ...desktopLeftItems,
      ...desktopRightItems,
    ],
  };
};

export default DashboardAppbarItems;
