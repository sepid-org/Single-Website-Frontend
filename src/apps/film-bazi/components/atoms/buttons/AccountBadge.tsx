import React, { Fragment, useState } from "react";
import { Stack, Typography, Avatar, Menu, MenuItem, Skeleton, useTheme, useMediaQuery, Button } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp';
import useLocalNavigate from "apps/film-bazi/hooks/useLocalNavigate";
import useUserProfile from "commons/hooks/useUserProfile";
import useLogout from "commons/hooks/useLogout";
import { SHAD_ORIGIN } from "apps/film-bazi/constants/game";

const AccountBadge = () => {
  const localNavigate = useLocalNavigate();
  const { data: userProfile, isLoading } = useUserProfile();
  const { logout, isLoading: isLogoutLoading } = useLogout();
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only('xs'));

  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    logout();
    handleMenuClose();
  };

  if (isLoading) {
    return (
      <Stack direction="row" alignItems="center" sx={{ paddingY: 1, borderRadius: 2 }}>
        <Skeleton variant="circular" width={35} height={35} />
        <Skeleton
          variant="text"
          width={isXs ? 120 : 160}
          height={40}
          sx={{ marginLeft: 1 }}
        />
        <Skeleton variant="circular" width={24} height={24} sx={{ marginLeft: 1 }} />
      </Stack>
    );
  }

  const { profile_image: profilePicture, fullName } = userProfile;

  return (
    <Fragment>
      <Button size="small" disableRipple onClick={handleMenuOpen}>
        <Stack
          direction="row"
          alignItems="center"
          sx={{
            borderRadius: 2,
          }}
        >
          <Avatar
            src={profilePicture}
            alt={fullName}
            sx={{ width: 35, height: 35 }}
          />
          <Typography fontWeight={700} fontSize={16} paddingLeft={1} noWrap sx={{ maxWidth: { xs: 120, sm: 160, md: '100%' } }}>
            {fullName}
          </Typography>
          {userProfile.origin !== SHAD_ORIGIN ?
            isMenuOpen ?
              <KeyboardArrowUp sx={{ marginLeft: 1 }} /> :
              <KeyboardArrowDownIcon sx={{ marginLeft: 1 }} />
            : null
          }
        </Stack>
      </Button>

      <Menu
        disableScrollLock
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <MenuItem disabled={isLogoutLoading} onClick={handleLogoutClick}>خروج</MenuItem>
      </Menu>
    </Fragment >
  );
};

export default AccountBadge;