import {
  Grid,
  InputAdornment,
  TextField,
} from '@mui/material';
import React, { FC } from 'react';

import { ProgramContactInfoType } from 'commons/types/models';
import RubikaIcon from 'commons/components/atoms/icons/Rubika';
import EitaaIcon from 'commons/components/atoms/icons/Eitaa';
import BaleIcon from 'commons/components/atoms/icons/Bale';
import InstagramIcon from 'commons/components/atoms/icons/Instagram';
import ShadIcon from 'commons/components/atoms/icons/Shad';
import TelegramIcon from 'commons/components/atoms/icons/Telegram';
import WhatsappIcon from 'commons/components/atoms/icons/Whatsapp';

type ProgramContactInfoFormPropsType = {
  data: ProgramContactInfoType | null;
  setData: any;
}

const ProgramContactInfoForm: FC<ProgramContactInfoFormPropsType> = ({
  data,
  setData,
}) => {

  const putData = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    })
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <TextField
          value={data?.phone_number || ''}
          fullWidth
          variant='outlined'
          label={'شماره تلفن ارتباطی'}
          name='phone_number'
          onChange={putData}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <BaleIcon />
              </InputAdornment>
            ),
          }}
          value={data?.bale_link || ''}
          fullWidth
          variant='outlined'
          label={'بله'}
          name='bale_link'
          onChange={putData}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EitaaIcon />
              </InputAdornment>
            ),
          }}
          value={data?.eitaa_link || ''}
          fullWidth
          variant='outlined'
          label={'ایتا'}
          name='eitaa_link'
          onChange={putData}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <ShadIcon />
              </InputAdornment>
            ),
          }}
          value={data?.shad_link || ''}
          fullWidth
          variant='outlined'
          label={'شاد'}
          name='shad_link'
          onChange={putData}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <RubikaIcon />
              </InputAdornment>
            ),
          }}
          value={data?.rubika_link || ''}
          fullWidth
          variant='outlined'
          label={'روبیکا'}
          name='rubika_link'
          onChange={putData}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <TelegramIcon />
              </InputAdornment>
            ),
          }}
          value={data?.telegram_link || ''}
          fullWidth
          variant='outlined'
          label={'تلگرام'}
          name='telegram_link'
          onChange={putData}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <InstagramIcon />
              </InputAdornment>
            ),
          }}
          value={data?.instagram_link || ''}
          fullWidth
          variant='outlined'
          label={'اینستاگرام'}
          name='instagram_link'
          onChange={putData}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <WhatsappIcon />
              </InputAdornment>
            ),
          }}
          value={data?.whatsapp_link || ''}
          fullWidth
          variant='outlined'
          label={'واتس‌اپ'}
          name='whatsapp_link'
          onChange={putData}
        />
      </Grid>
    </Grid>
  );
}

export default ProgramContactInfoForm;
