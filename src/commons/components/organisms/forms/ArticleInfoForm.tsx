import {
  FormControlLabel,
  Grid,
  Switch,
  TextField,
} from '@mui/material';
import UploadImage from 'commons/components/molecules/UploadImage';
import React, { FC } from 'react';
import { ArticleType } from 'commons/types/redux/article';
import TagField from 'commons/components/molecules/TagField';

type ArticleInfoFormPropsType = {
  data: Partial<ArticleType>;
  setData: any;
  showCoverImage?: boolean;
}

const ArticleInfoForm: FC<ArticleInfoFormPropsType> = ({
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

  const setTags = (newTags: string[]) => {
    setData({
      ...data,
      tags: newTags,
    });
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
        <UploadImage showImageSelf={showCoverImage} file={data.cover_image} setFile={(file) => setData(properties => ({ ...properties, cover_page: file }))} />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          value={data.description}
          variant='outlined'
          label={'توضیحات مقاله'}
          name='description'
          onChange={putData}
        />
      </Grid>
      <Grid item xs={12}>
        <TagField setTags={setTags} tags={data.tags}/>
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControlLabel
          name='is_visible'
          checked={!data.is_hidden}
          onChange={() => toggleValue('is_visible')}
          control={<Switch color="primary" />}
          label="قابل مشاهده برای مخاطبان:"
          labelPlacement='start'
        />
      </Grid>
    </Grid>
  );
}

export default ArticleInfoForm;
