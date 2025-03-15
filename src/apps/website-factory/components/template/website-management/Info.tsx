import {
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import React, { FC, Fragment, useState } from 'react';
import { useGetWebsiteQuery } from 'apps/website-display/redux/features/WebsiteSlice';
import ProfileImageUploader from 'commons/components/molecules/profile-inputs/ProfileImageUploader';

type WebsiteInfoTabPropsType = {

}

const WebsiteInfoTab: FC<WebsiteInfoTabPropsType> = ({

}) => {
  const { data: website } = useGetWebsiteQuery();
  const [academyName, setAcademyName] = useState('');
  const [mobileAcademyLogo, setMobileAcademyLogo] = useState('');
  const [desktopAcademyLogo, setDesktopAcademyLogo] = useState('');

  return (
    <Fragment>
      <Grid
        container item
        spacing={5}
        alignItems="center"
        justifyContent="center"
        direction="row">
        <Grid item xs={12}>
          <Typography variant='h2' gutterBottom>{'مشخصات آموزشگاه'}</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label={'عنوان آموزشگاه'}
            value={academyName}
            onChange={(e) => setAcademyName(e.target.value)}
            variant='outlined'
            size='medium'
            sx={{ minWidth: '50%' }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography>{'لوگوی حالت موبایل:'}</Typography>
          <ProfileImageUploader
            file={mobileAcademyLogo}
            setFile={setMobileAcademyLogo}
            id={'mobile'}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography>{'لوگوی حالت دسکتاپ:'}</Typography>
          <ProfileImageUploader
            file={desktopAcademyLogo}
            setFile={setDesktopAcademyLogo}
            id={'desktop'}
          />
        </Grid>
      </Grid>
    </Fragment>
  );
}

export default WebsiteInfoTab;
