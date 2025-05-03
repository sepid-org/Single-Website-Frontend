import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from '@mui/material';
import UploadImage from 'commons/components/molecules/UploadImage';
import React, { FC } from 'react';

import { FSMType } from 'commons/types/models';

type FSMInfoFormPropsType = {
  data: Partial<FSMType>;
  setData: any;
  showCoverImage?: boolean;
}

const FSMInfoForm: FC<FSMInfoFormPropsType> = ({
  data,
  setData,
  showCoverImage = false,
}) => {

  const putData = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    })
  }

  const toggleValue = (name: string) => {
    setData(properties => ({
      ...properties,
      [name]: !properties[name],
    }));
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <TextField
          value={data.name}
          fullWidth
          variant='outlined'
          label={'نام'}
          name='name'
          onChange={putData}
        />
      </Grid>
      <Grid item xs={12} md={6} alignItems={'stretch'} justifyContent={'stretch'}>
        <UploadImage showImageSelf={showCoverImage} file={data.cover_image} setFile={(file) => setData(properties => ({ ...properties, cover_image: file }))} />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          value={data.description}
          variant='outlined'
          label={'توضیحات کارگاه'}
          name='description'
          onChange={putData}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth variant="outlined">
          <InputLabel>نوع آموزش</InputLabel>
          <Select
            value={data.fsm_learning_type}
            onChange={putData}
            name='fsm_learning_type'
            label='نوع آموزش'>
            <MenuItem value={'Unsupervised'}>{'بدون همیار'}</MenuItem>
            <MenuItem disabled value={'Supervised'}>{'با همیار'}</MenuItem>
          </Select>
          <FormHelperText>{'همیار می‌تواند در محیط سامانه، به‌صورت در لحظه، به سوالات شرکت‌کنندگان پاسخ دهد و با آن‌ها گفتگو کند.'}</FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth variant="outlined">
          <InputLabel>وضعیت کارگاه</InputLabel>
          <Select
            value={data.fsm_p_type}
            onChange={putData}
            name='fsm_p_type'
            label='وضعیت کارگاه'>
            <MenuItem value={'Individual'}>{'فردی'}</MenuItem>
            <MenuItem disabled value={'Team'}>{'تیمی'}</MenuItem>
            <MenuItem disabled value={'Hybrid'}>{'هیبرید'}</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      {/* <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          value={data.order}
          variant='outlined'
          label={'اولویت نمایش'}
          name='order'
          onChange={putData}
          helperText={'کارگاه با اولویت نمایش کوچک‌تر، زودتر در صفحه‌ی اصلیِ دوره نمایش داده می‌شود.'}
        />
      </Grid> */}
      <Grid item xs={12} md={6}>
        <FormControl fullWidth variant="outlined">
          <InputLabel>نوع کارت</InputLabel>
          <Select
            value={data.card_type}
            onChange={putData}
            name='card_type'
            label='نوع کارت'>
            <MenuItem value={'vertical1'}>{'عمودی ۱'}</MenuItem>
            <MenuItem disabled value={'horizontal1'}>{'افقی ۱'}</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControlLabel
          name='is_active'
          checked={data.is_active}
          onChange={() => toggleValue('is_active')}
          control={<Switch color="primary" />}
          label="فعال بودن ورود به کارگاه:"
          labelPlacement='start'
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControlLabel
          name='is_visible'
          checked={data.is_visible}
          onChange={() => toggleValue('is_visible')}
          control={<Switch color="primary" />}
          label="قابل مشاهده برای شرکت‌کنندگان:"
          labelPlacement='start'
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControlLabel
          name='show_roadmap'
          checked={data.show_roadmap}
          onChange={() => toggleValue('show_roadmap')}
          control={<Switch color="primary" />}
          label="نمایش نقشه راه:"
          labelPlacement='start'
        />
      </Grid>
    </Grid>
  );
}

export default FSMInfoForm;
