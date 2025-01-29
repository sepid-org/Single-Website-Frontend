import { Avatar, IconButton, Menu, MenuItem, Stack, Typography } from '@mui/material';
import React, { FC, Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { stringToColor } from 'commons/utils/stringToColor';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useGetWebsitePermissionQuery } from 'apps/website-display/redux/features/WebsiteSlice';
import useLogout from 'commons/hooks/useLogout';
import useUserProfile from 'commons/hooks/useUserProfile';

type UserAvatarPropsType = {}

const UserAvatar: FC<UserAvatarPropsType> = ({ }) => {
  const { logout } = useLogout();
  const { data: { fullName, profile_image: profilePicture } } = useUserProfile();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { data: websitePermissions } = useGetWebsitePermissionQuery();

  return (
    <Fragment>
      <IconButton size='small' onClick={handleClick}>
        <Avatar
          src={profilePicture}
          sx={{ backgroundColor: stringToColor(fullName) }}
          alt="logo" />
      </IconButton>
      <Menu
        disableScrollLock
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}>
        <Typography sx={{ padding: 1, paddingX: 2, userSelect: 'none' }} fontWeight={500} fontSize={20}>
          {fullName || 'بی‌نام بی‌نام‌زاده'}
        </Typography>
        <MenuItem onClick={() => {
          navigate('/setting/');
        }}>
          <Stack direction='row' spacing={1} alignItems={'center'}>
            <AccountCircleIcon />
            <Typography>
              {'تنظیمات فردی'}
            </Typography>
          </Stack>
        </MenuItem>
        {websitePermissions?.isAdmin &&
          <MenuItem onClick={() => navigate(`/management/`)}>
            <Stack direction='row' spacing={1} alignItems={'center'}>
              <SettingsIcon />
              <Typography>
                {'تنظیمات آموزشگاه'}
              </Typography>
            </Stack>
          </MenuItem>
        }
        <MenuItem onClick={logout}>
          <Stack direction='row' spacing={1} alignItems={'center'}>
            <LogoutIcon />
            <Typography>
              {'خروج از حساب کاربری'}
            </Typography>
          </Stack>
        </MenuItem>
      </Menu>
    </Fragment>
  );
}

export default UserAvatar;