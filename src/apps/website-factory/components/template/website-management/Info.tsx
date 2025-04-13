import {
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import React, { FC, Fragment, useEffect, useState } from 'react';
import { useGetWebsiteQuery } from 'apps/website-display/redux/features/WebsiteSlice';
import ProfileImageUploader from 'commons/components/molecules/profile-inputs/ProfileImageUploader';
import { useUpdateWebsiteMutation } from 'apps/website-factory/redux/features/website/WebsiteSlice';
import { toast } from 'react-toastify';

type WebsiteInfoTabPropsType = {}

const WebsiteInfoTab: FC<WebsiteInfoTabPropsType> = ({

}) => {
  const { data: website } = useGetWebsiteQuery();
  const [title, setAcademyTitle] = useState(website.title);
  const [mobileLogo, setMobileAcademyLogo] = useState(website.logo?.mobile_image);
  const [desktopLogo, setDesktopAcademyLogo] = useState(website.logo?.desktop_image);
  const [updateWebsite, updateWebsiteResult] = useUpdateWebsiteMutation();
  const [disableRegister, setDisableRegister] = useState(true);

  const initialTitle = website.title;
  const initialMobileLogo = website.logo?.mobile_image;
  const initialDesktopLogo = website.logo?.desktop_image;
  
  const handleClick = () => {
    updateWebsite({
      title,
      mobile_image: mobileLogo,
      desktop_image: desktopLogo,
    })
  }

  useEffect(() => {
      if(
        title != initialTitle || 
        desktopLogo != initialDesktopLogo ||
        mobileLogo != initialMobileLogo
      ){
        setDisableRegister(false);
      }
    }, [title, desktopLogo, mobileLogo])

  useEffect(() => {
    if (updateWebsiteResult.isSuccess) {
      toast.success('مشخصات آموزشگاه با موفقیت به‌روز شد.')
    }
  }, [updateWebsiteResult.isSuccess])

  return (
    <Grid
      container
      item
      spacing={2}
      alignItems="center"
      justifyContent="center"
      direction="row"
    >
      <Grid
        item
        container
        xs={12}
        spacing={2}
        sx={{
          marginTop: 2,
          justifyContent: 'space-between'
        }}
      >
        <Grid item>
          <Typography variant='h2' gutterBottom>{'مشخصات آموزشگاه'}</Typography>
        </Grid>
        <Grid item>
          <Button
            variant='contained'
            disabled={disableRegister}
            onClick={handleClick}
          >
            {'ثبت'}
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <TextField
          label={'عنوان آموزشگاه'}
          value={title}
          onChange={(e) => setAcademyTitle(e.target.value)}
          variant='outlined'
          size='medium'
          sx={{ minWidth: '50%' }}
        />
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography>{'لوگوی حالت موبایل:'}</Typography>
        <ProfileImageUploader
          file={mobileLogo}
          setFile={setMobileAcademyLogo}
          id={'mobile'}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography>{'لوگوی حالت دسکتاپ:'}</Typography>
        <ProfileImageUploader
          file={desktopLogo}
          setFile={setDesktopAcademyLogo}
          id={'desktop'}
        />
      </Grid>
    </Grid>
  );
}

export default WebsiteInfoTab;
