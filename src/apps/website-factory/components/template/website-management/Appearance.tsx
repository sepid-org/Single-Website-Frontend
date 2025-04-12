import React, { FC, useEffect, useState } from 'react';
import { Button, Divider, Grid, Typography } from '@mui/material';
import { useUpdateThemeMutation } from 'apps/website-factory/redux/features/appearance/AppearanceSlice';
import ColorPaletteSelector from 'apps/website-factory/components/template/website-management/organisms/ColorSelector';
import FontSelector from 'apps/website-factory/components/template/website-management/organisms/FontSelector';
import { toast } from 'react-toastify';
import { useTheme } from '@mui/material/styles';


type AppearanceTabPropsType = {
}

const AppearanceTab: FC<AppearanceTabPropsType> = ({
}) => {

  const theme = useTheme();

  const [selectedColors, setSelectedColors] = useState({
    primary: theme.palette.primary.main,
    secondary: theme.palette.secondary.main,
    background: theme.palette.background.default,
    text: theme.palette.text.primary,
    accent: theme.palette.accent,
  });
  const [selectedFont, setSelectedFont] = useState(theme.typography.fontFamily);
  const [updateTheme, updateThemeResult] = useUpdateThemeMutation();

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

  return (
    <Grid
      container
      item
      spacing={2}
      alignItems="center"
      justifyContent="center"
      direction="row"
    >
      <Grid item container xs={12} spacing={2} style={{ marginTop: 2 }}>
        <Grid item xs={12}>
          <Typography variant='h2'>
            {'تنظیمات ظاهری'}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography
            variant='h4'
            sx={{ marginBottom: 1 }}
          >
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
          <Typography
            variant='h4'
            sx={{ marginBottom: 1 }}
          >
            {'پالت رنگ'}
          </Typography>
          <ColorPaletteSelector
            selectedColors={selectedColors}
            setSelectedColors={setSelectedColors}
          />
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item>
          <Button
            variant='outlined'
            onClick={handleThemeUpdate}
            size='large'
          >
            {'ثبت'}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default AppearanceTab;
