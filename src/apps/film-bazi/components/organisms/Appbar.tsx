import React, { useState } from 'react';
import { AppBar, Button, Container, Drawer, IconButton, Stack, Toolbar, Typography, styled, useMediaQuery } from '@mui/material';
import AccountBadge from '../atoms/buttons/AccountBadge';
import HomeIcon from '../atoms/icons/HomeIcon';
import NotificationIcon from '../atoms/icons/NotificationIcon';
import MenuIcon from '@mui/icons-material/Menu'; // Menu icon for mobile drawer toggle
import useLocalNavigate from 'apps/film-bazi/hooks/useLocalNavigate';
import { useTheme } from '@mui/material/styles'; // To get theme breakpoints

const CustomAppBar = styled(AppBar)(({ theme }) => ({
  boxShadow: '0px 4px 4px 0px #00000040',
  border: '1px solid #4D4D4D',
  background: '#0D082A',
  width: '100%',
  height: '105px',
  borderWidth: '2px 0px 0px 0px',
  opacity: 1,
  position: 'static',
  margin: '0 auto',
}));

const CustomToolbar = styled(Toolbar)({
  height: '100%',
  padding: 0,
  minHeight: 'unset',
});

const AppBarComponent = () => {
  const localNavigate = useLocalNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check if screen size is mobile
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const DrawerContent = (
    <Stack spacing={2} padding={2}>
      <Button startIcon={<NotificationIcon />} onClick={() => localNavigate('/')}>
        <Typography fontWeight={700} fontSize={18} color={'black'}>
          {'اطلاعیه‌ها'}
        </Typography>
      </Button>
      <Button startIcon={<HomeIcon />} onClick={() => localNavigate('/')}>
        <Typography fontWeight={700} fontSize={18} color={'black'}>
          {'خانه'}
        </Typography>
      </Button>
    </Stack>
  );

  return (
    <CustomAppBar position="static">
      <CustomToolbar>
        <Container maxWidth="lg">
          <Stack width={'100%'} direction={'row'} justifyContent={'space-between'}>
            <Stack direction={'row'}>
              <AccountBadge />
            </Stack>
            {isMobile ? (
              <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
            ) : (
              <Stack direction={'row-reverse'} spacing={2}>
                <Button startIcon={<NotificationIcon />} onClick={() => localNavigate('/notifications/')}>
                  <Typography fontWeight={700} fontSize={18} color={'white'}>
                    {'اطلاعیه‌ها'}
                  </Typography>
                </Button>
                <Button startIcon={<HomeIcon />} onClick={() => localNavigate('/')}>
                  <Typography fontWeight={700} fontSize={18} color={'white'}>
                    {'خانه'}
                  </Typography>
                </Button>
              </Stack>
            )}
          </Stack>
        </Container>
      </CustomToolbar>

      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        {DrawerContent}
      </Drawer>
    </CustomAppBar>
  );
};

export default AppBarComponent;
