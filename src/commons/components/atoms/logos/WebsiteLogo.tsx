import React, { FC } from "react";
import { IconButton, Skeleton, useMediaQuery, useTheme } from "@mui/material";
import { useGetWebsiteQuery } from "apps/website-display/redux/features/WebsiteSlice";
import { Link } from "react-router-dom";

type WebsiteLogoPropsType = {
  size?: 'small' | 'normal' | 'large';
}

const sizes = {
  small: {
    width: 50,
    height: 50,
    maxWidth: 200,
    maxHeight: 50,
  },
  normal: {
    width: 75,
    height: 75,
    maxWidth: 250,
    maxHeight: 75,
  },
  large: {
    width: 100,
    height: 100,
    maxWidth: 300,
    maxHeight: 100,
  },
}

const WebsiteLogo: FC<WebsiteLogoPropsType> = ({
  size = 'small',
}) => {

  const logoSize = sizes[size];

  const {
    data: website,
    isSuccess,
  } = useGetWebsiteQuery();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  if (!isSuccess) {
    return <Skeleton variant="circular" width={logoSize.width} height={logoSize.height} />
  }

  return (
    <IconButton sx={{ padding: 0, paddingX: 1, userSelect: 'none' }} disableRipple component={Link} to='/'>
      <img alt="website-logo" unselectable="on" src={isMobile ? website.logo.mobile_image : website.logo.desktop_image}
        style={{
          minWidth: logoSize.width,
          minHeight: logoSize.height,
          maxWidth: logoSize.maxWidth,
          maxHeight: logoSize.maxHeight,
        }}
      />
    </IconButton>
  );
}

export default WebsiteLogo;