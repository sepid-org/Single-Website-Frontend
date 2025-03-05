import React, { useState } from 'react';
import { Box, Grid, Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';
import { ChromePicker } from 'react-color';

const predefinedPalettes = [
  {
    primary: '#3f51b5',
    secondary: '#f50057',
    error: '#f44336',
    background: '#ffffff',
    text: '#000000',
  },
  {
    primary: '#90caf9',
    secondary: '#f48fb1',
    error: '#e57373',
    background: '#121212',
    text: '#ffffff',
  },
  {
    primary: '#a6d4fa',
    secondary: '#f8bbd0',
    error: '#ffcdd2',
    background: '#f3e5f5',
    text: '#4a148c',
  },
];

const ColorPaletteSelector = () => {
  const [selectedColors, setSelectedColors] = useState({
    primary: '',
    secondary: '',
    error: '',
    background: '',
    text: '',
  });

  const [openDialog, setOpenDialog] = useState(false);
  const [currentColorKey, setCurrentColorKey] = useState('');
  const [currentColor, setCurrentColor] = useState('');

  const handleColorClick = (colorKey) => {
    setCurrentColorKey(colorKey);
    setCurrentColor(selectedColors[colorKey]);
    setOpenDialog(true);
  };

  const handleColorChange = (color) => {
    setCurrentColor(color.hex);
  };

  const handleSelectColor = () => {
    setSelectedColors((prev) => ({
      ...prev,
      [currentColorKey]: currentColor,
    }));
    setOpenDialog(false);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handlePaletteSelect = (palette) => {
    setSelectedColors(palette);
  };

  return (
    <Grid container item xs={12}>
      {/* Main Color Palette */}
      <Grid
        container
        item
        xs={12}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: 2,
        }}
      >
        {Object.entries(selectedColors).map(([key, value]) => (
          <Grid
            item
            xs={2}
            key={key}
            onClick={() => handleColorClick(key)}
            sx={{
              height: 100,
              backgroundColor: value || 'transparent',
              border: '1px solid #ccc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <Typography
              variant="body2"
              overflow="hidden"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
            >
              {key}
            </Typography>
          </Grid>
        ))}
      </Grid>

      {/* Predefined Palettes */}
      <Grid item container xs={12}>
        <Grid item xs={12}>
          <Typography>
            {'پالت‌های پیشنهادی'}
          </Typography>
        </Grid>
        <Grid
          container
          item
          xs={12}
          display={'flex'}
          justifyContent={'center'}
        >
          {predefinedPalettes.map((palette, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              display={'flex'}
              
            >
              <Button
                key={index}
                onClick={() => handlePaletteSelect(palette)}
                sx={{
                  padding: 0,
                  width: '100%',
                  textTransform: 'none',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    width: '100%'
                  }}
                >
                  {Object.entries(palette).map(([key, value]) => (
                    <Box
                      key={key}
                      sx={{
                        width: '16.6%',
                        maxWidth: 40,
                        height: 40, // Rectangle shape (width > height)
                        backgroundColor: value,
                        border: '1px solid #ccc',
                      }}
                    />
                  ))}
                </Box>
              </Button>
            </Grid>
          ))}
        </Grid>
      </Grid>

      {/* Color Picker Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Select {currentColorKey} Color</DialogTitle>
        <DialogContent>
          <ChromePicker color={currentColor} onChangeComplete={handleColorChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleSelectColor} variant="contained">
            Select
          </Button>
        </DialogActions>
      </Dialog>
    </Grid >
  );
};

export default ColorPaletteSelector;