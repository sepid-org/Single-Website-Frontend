import React from 'react';
import { AppBar, Toolbar, styled } from '@mui/material';

const CustomAppBar = styled(AppBar)(({ theme }) => ({
  boxShadow: '0px 4px 4px 0px #00000040',
  border: '1px solid #4D4D4D',
  background: '#0D082A',
  width: '100%',
  height: '105px',
  padding: '32px 80px',
  gap: '10px',
  borderWidth: '1px 0px 0px 0px',
  opacity: 1, // Note: Changed from 0 to 1 for visibility
  position: 'static', // To allow custom width
  margin: '0 auto', // Center the AppBar if parent is wider
}));

const CustomToolbar = styled(Toolbar)({
  height: '100%',
  padding: 0, // Remove default padding
  minHeight: 'unset', // Override default minHeight
});

const AppBarComponent = () => {
  return (
    <CustomAppBar position="static">
      <CustomToolbar>
      
      </CustomToolbar>
    </CustomAppBar>
  );
};

export default AppBarComponent;