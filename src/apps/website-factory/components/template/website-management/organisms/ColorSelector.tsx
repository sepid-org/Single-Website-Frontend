import React, { useState } from 'react';
import { Box, Grid, Button, Dialog, DialogTitle, DialogActions, Typography, Stack, useTheme } from '@mui/material';
import { ChromePicker } from 'react-color';
import { useGetThemeTemplatesQuery } from 'apps/website-factory/redux/features/appearance/AppearanceSlice';


const colorTranslations = {
  primary: 'اصلی',
  secondary: 'ثانویه',
  accent: 'تاکیدی',
  background: 'پس‌زمینه',
  text: 'متن',
}

interface ColorPaletteSelectorProps {
  selectedColors: any;
  setSelectedColors: any;
}

const ColorPaletteSelector: React.FC<ColorPaletteSelectorProps> = ({ selectedColors, setSelectedColors }) => {
  const { data, isLoading, error } = useGetThemeTemplatesQuery();
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

  function getOppositeColor(color) {
    color = color.replace('#', '');

    // Convert 3-digit HEX to 6-digit
    if (color.length === 3) {
      color = color.split('').map(c => c + c).join('');
    }

    // Convert to RGB
    const r = parseInt(color.substring(0, 2), 16);
    const g = parseInt(color.substring(2, 4), 16);
    const b = parseInt(color.substring(4, 6), 16);

    // Calculate inverse RGB
    const invR = 255 - r;
    const invG = 255 - g;
    const invB = 255 - b;

    // Convert back to HEX
    const invColor =
      invR.toString(16).padStart(2, '0') +
      invG.toString(16).padStart(2, '0') +
      invB.toString(16).padStart(2, '0');

    return `#${invColor.toUpperCase()}`;
  }

  return (
    <Grid container item xs={12}>
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
            xs={12 / 5}
            md={2}
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
              sx={{ textShadow: 'rgba(255, 255, 255, 0.8)' }}
            >
              {colorTranslations[key]}
            </Typography>
          </Grid>
        ))}
      </Grid>

      <Grid item container xs={12}>
        <Grid item xs={12}>
          <Typography gutterBottom>
            {'پالت‌های پیشنهادی:'}
          </Typography>
        </Grid>
        <Grid
          container
          item
          xs={12}
          spacing={1}
        >
          {data?.results
            .map((palette, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                display={'flex'}
                justifyContent={{ xs: 'center', sm: 'space-between' }}
              >
                <Button
                  key={index}
                  onClick={() => handlePaletteSelect(palette.body)}
                  sx={{
                    padding: 0,
                    textTransform: 'none',
                    width: '100%',
                    maxWidth: 200,
                  }}
                >
                  <Stack
                    width={'100%'}
                    display={'flex'}
                    direction={'row'}
                  >
                    {Object.entries(palette.body).map(([key, value]) => (
                      <Box
                        key={key}
                        sx={{
                          width: '20%',
                          maxWidth: 40,
                          height: 40,
                          backgroundColor: value,
                          border: '1px solid #ccc',
                        }}
                      />
                    ))}
                  </Stack>
                </Button>
              </Grid>
            ))}
        </Grid>
      </Grid>

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>
          {'انتخاب رنگ ' + colorTranslations[currentColorKey]}
        </DialogTitle>
        <ChromePicker
          styles={{
            default: {
              picker: {
                boxShadow: 'none',
              },
            },
          }}
          color={currentColor}
          onChangeComplete={handleColorChange}
        />
        <DialogActions>
          <Button onClick={handleDialogClose}>{'بی‌خیال'}</Button>
          <Button onClick={handleSelectColor} variant="contained">
            {'انتخاب'}
          </Button>
        </DialogActions>
      </Dialog>
    </Grid >
  );
};

export default ColorPaletteSelector;