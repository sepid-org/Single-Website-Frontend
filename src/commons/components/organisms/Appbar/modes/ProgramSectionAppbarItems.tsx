import React from 'react';
import DashboardButton from '../components/DashboardButton';
import { useParams } from 'react-router-dom';
import WebsiteLogo from 'commons/components/atoms/logos/WebsiteLogo';

const ProgramSectionAppbarItems = ({ }) => {
  const { programSlug } = useParams();
  const backButton = <DashboardButton label={'بازگشت به دوره'} to={`/program/${programSlug}`} />
  const websiteLogo = <WebsiteLogo />

  const desktopLeftItems = [backButton];
  const desktopRightItems = [websiteLogo];
  const mobileRightItems = [websiteLogo];

  return {
    desktopLeftItems,
    desktopRightItems,
    mobileLeftItems: [backButton],
    mobileRightItems,
    mobileMenuListItems: [],
  };
};

export default ProgramSectionAppbarItems;