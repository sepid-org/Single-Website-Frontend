import React, { useState } from "react";
import { IconButton, Stack, Typography, Avatar, Menu, MenuItem, Skeleton, useTheme, useMediaQuery } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import useLocalNavigate from "apps/film-bazi/hooks/useLocalNavigate";
import useUserProfile from "commons/hooks/useUserProfile";
import useLogout from "commons/hooks/useLogout";

const AccountBadge = () => {
  const localNavigate = useLocalNavigate();
  const { data: userProfile, isLoading } = useUserProfile();
  const { logout } = useLogout();
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

  const handleProfileClick = () => {
    localNavigate('/profile/');
    handleMenuClose();
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

  const { profile_picture: profilePicture, fullName } = userProfile;

  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        paddingY: 1,
        borderRadius: 2,
      }}
    >
      <Avatar
        src={profilePicture}
        alt={fullName}
        sx={{ width: 35, height: 35 }}
      />

      <Typography fontWeight={700} fontSize={16} paddingLeft={1}>
        {fullName}
      </Typography>

      <IconButton sx={{ color: 'white' }} onClick={handleMenuOpen}>
        <KeyboardArrowDownIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <MenuItem onClick={handleProfileClick}>پروفایل</MenuItem>
        <MenuItem onClick={handleLogoutClick}>خروج</MenuItem>
      </Menu>
    </Stack>
  );
};

export default AccountBadge;