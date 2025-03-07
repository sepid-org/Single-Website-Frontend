import { Divider, Grid, Typography } from '@mui/material';
import ColorPaletteSelector from 'commons/components/organisms/ColorSelector';
import FontSelector from 'commons/components/organisms/FontSelector';
import React, { Fragment, FC, useState } from 'react';

type AppearanceTabPropsType = {
}

const AppearanceTab: FC<AppearanceTabPropsType> = ({
}) => {

  const [selectedColors, setSelectedColors] = useState({
    primary: '',
    secondary: '',
    error: '',
    background: '',
    text: '',
  });

  const [selectedFont, setSelectedFont] = useState('iranyekan');

  return (
    <Fragment>
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
          <Grid item xs={12} marginTop={2} marginBottom={2}>
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
        </Grid>
      </Grid>
    </Fragment>
  );
}

export default AppearanceTab;
