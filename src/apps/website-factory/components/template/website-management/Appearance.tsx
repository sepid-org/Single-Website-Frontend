import React, { FC, useEffect, useState } from 'react';
import { Button, Divider, Grid, Typography } from '@mui/material';
import { useUpdateThemeMutation } from 'apps/website-factory/redux/features/appearance/AppearanceSlice';
import ColorPaletteSelector from 'apps/website-factory/components/template/website-management/organisms/ColorSelector';
import FontSelector from 'apps/website-factory/components/template/website-management/organisms/FontSelector';
import { toast } from 'react-toastify';
import { useTheme } from '@mui/material/styles';
import { shallowEqual } from 'commons/utils/ObjectEqualityChecker';

type AppearanceTabPropsType = {}

const AppearanceTab: FC<AppearanceTabPropsType> = ({ }) => {

  const theme = useTheme();

  const [selectedColors, setSelectedColors] = useState({
    primary: theme.palette.primary.main,
    secondary: theme.palette.secondary.main,
    background: theme.palette.background.default,
    text: theme.palette.text.primary,
    accent: theme.palette.accent,
  });
  const [selectedFont, setSelectedFont] = useState(theme.typography.fontFamily);
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [updateTheme, updateThemeResult] = useUpdateThemeMutation();

  const initialFont = theme.typography.fontFamily;
  const initialPalette = {
    primary: theme.palette.primary.main,
    secondary: theme.palette.secondary.main,
    background: theme.palette.background.default,
    text: theme.palette.text.primary,
    accent: theme.palette.accent,
  }

  const handleThemeUpdate = async () => {
    updateTheme({
      font: selectedFont,
      ...selectedColors,
    });
  };

  useEffect(() => {
    if (updateThemeResult.isSuccess) {
      toast.success('تنظیمات ظاهری با موفقیت به‌روز شد.')
    }
  }, [updateThemeResult.isSuccess])

  useEffect(() => {
    if (shallowEqual(selectedFont, initialFont) && shallowEqual(selectedColors, initialPalette)) {
      setDisableSubmit(true);
    } else {
      setDisableSubmit(false);
    }
  }, [selectedFont, selectedColors])

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid
        item
        container
        xs={12}
        spacing={2}
        justifyContent={'space-between'}
      >
        <Grid item>
          <Typography variant='h2'>
            {'تنظیمات ظاهری'}
          </Typography>
        </Grid>
        <Grid item>
          <Button
            variant='contained'
            disabled={disableSubmit}
            onClick={handleThemeUpdate}
          >
            {'ثبت'}
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant='h3' gutterBottom>
          {'فونت'}
        </Typography>
        <FontSelector
          selectedFont={selectedFont}
          setSelectedFont={setSelectedFont}
        />
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <Typography variant='h3' gutterBottom>
          {'پالت رنگ'}
        </Typography>
        <ColorPaletteSelector
          selectedColors={selectedColors}
          setSelectedColors={setSelectedColors}
        />
      </Grid>
    </Grid>
  );
}

export default AppearanceTab;
