import { Grid, Typography } from '@mui/material';
import React, { Fragment, FC } from 'react';

type ThirdPartiesTabPropsType = {
}

const ThirdPartiesTab: FC<ThirdPartiesTabPropsType> = ({
}) => {

  return (
    <Fragment>
      <Grid
        container
        item
        spacing={2}
        alignItems="center"
        justifyContent="center"
        direction="row">

        <Grid item container justifyContent='space-between' xs={12} spacing={2} style={{ marginTop: 2 }}>
          <Grid item>
            <Typography variant='h2'>
              {'افزونه‌ها'}
            </Typography>
          </Grid>
        </Grid>

      </Grid>
    </Fragment>
  );
}

export default ThirdPartiesTab;
