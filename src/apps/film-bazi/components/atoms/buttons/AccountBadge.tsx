import { IconButton, Stack, Typography, Avatar, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useSelector } from "react-redux";
import { useGetUserProfileQuery } from "apps/website-display/redux/features/party/ProfileSlice";
import useLocalNavigate from "apps/film-bazi/hooks/useLocalNavigate";
import useUserProfile from "commons/hooks/useUserProfile";
import useLogout from "commons/hooks/useLogout";

const AccountBadge = () => {
  const localNavigate = useLocalNavigate();
  const { profile_picture: profilePicture, fullName } = useUserProfile();
  const { logout } = useLogout();

  // State to manage the menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  // Handle menu opening
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle menu closing
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Menu option handlers
  const handleProfileClick = () => {
    // Logic for navigating to profile
    localNavigate('/profile/');
    handleMenuClose();
  };

  const handleLogoutClick = () => {
    // Logic for logging out
    logout();
    handleMenuClose();
  };

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

      <Typography fontWeight={700} fontSize={16} color="white" paddingLeft={1}>
        {fullName}
      </Typography>

      {/* Icon button for opening the menu */}
      <IconButton sx={{ color: 'white' }} onClick={handleMenuOpen}>
        <KeyboardArrowDownIcon />
      </IconButton>

      {/* Dropdown menu */}
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
