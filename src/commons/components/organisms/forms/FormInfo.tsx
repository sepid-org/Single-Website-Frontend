import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import JalaliDataTimePicker from 'commons/components/molecules/JalaliDataTimePicker';
import moment from 'moment';
import React, { FC } from 'react';
import { toast } from 'react-toastify';

import { RegistrationFormType } from 'commons/types/models';

type FormInfoPropsType = {
  data: Partial<RegistrationFormType>;
  setData: any;
  showCoverImage?: boolean;
}

const FormInfo: FC<FormInfoPropsType> = ({
  data,
  setData,
}) => {

  const putData = (event) => {
    const { name, value } = event.target;
    let newData = {
      ...data,
      [name]: value,
    };

    if (name === 'audience_type' && value !== 'Student') {
      newData.min_grade = undefined;
      newData.max_grade = undefined;
    }

    setData(newData);
  }

  const setSinceField = (newValue: string) => {
    if (data?.end_date) {
      if (moment(newValue).isAfter(moment(data.end_date))) {
        toast.error('تاریخ شروع نمی‌تواند بعد از تاریخ پایان باشد.');
        setData({
          ...data,
          'start_date': data.end_date,
        });
        return;
      }
    }
    setData({
      ...data,
      'start_date': newValue,
    });
  }

  const setTillField = (newValue: string) => {
    if (data?.start_date) {
      if (moment(data.start_date).isAfter(moment(newValue))) {
        toast.error('تاریخ پایان نمی‌تواند قبل از تاریخ شروع باشد.');
        setData({
          ...data,
          'end_date': data.start_date,
        });
        return;
      }
    }
    setData({
      ...data,
      'end_date': newValue,
    });
  }

  const grades = [
    { value: '1', label: 'پایه اول' },
    { value: '2', label: 'پایه دوم' },
    { value: '3', label: 'پایه سوم' },
    { value: '4', label: 'پایه چهارم' },
    { value: '5', label: 'پایه پنجم' },
    { value: '6', label: 'پایه ششم' },
    { value: '7', label: 'پایه هفتم' },
    { value: '8', label: 'پایه هشتم' },
    { value: '9', label: 'پایه نهم' },
    { value: '10', label: 'پایه دهم' },
    { value: '11', label: 'پایه یازدهم' },
    { value: '12', label: 'پایه دوازدهم' },
  ];

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <FormControl fullWidth variant="outlined">
          <InputLabel>{'چگونگی تایید افراد'}</InputLabel>
          <Select
            value={data?.accepting_status || ''}
            onChange={putData}
            name='accepting_status'
            label='چگونگی تایید افراد'>
            <MenuItem value={'AutoAccept'}>{'خودکار'}</MenuItem>
            <MenuItem value={'Manual'}>{'دستی'}</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} md={4}>
        <FormControl fullWidth variant="outlined">
          <InputLabel>{'وضعیت تحصیلی مخاطبین'}</InputLabel>
          <Select
            value={data?.audience_type || ''}
            onChange={putData}
            name='audience_type'
            label='وضعیت تحصیلی مخاطبین'>
            <MenuItem value={'Student'}>{'دانش‌آموز'}</MenuItem>
            <MenuItem value={'Academic'}>{'دانشجو'}</MenuItem>
            <MenuItem value={'All'}>{'عام'}</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} md={4}>
        <FormControl fullWidth variant="outlined">
          <InputLabel>{'جنسیت مخاطبین'}</InputLabel>
          <Select
            value={data?.gender_partition_status || ''}
            onChange={putData}
            name='gender_partition_status'
            label='جنسبت مخاطبین'>
            <MenuItem value={'BothPartitioned'}>{'هر دو گروه'}</MenuItem>
            <MenuItem value={'OnlyMale'}>{'فقط پسران'}</MenuItem>
            <MenuItem value={'OnlyFemale'}>{'فقط دختران'}</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      {data?.audience_type === 'Student' && (
        <>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>{'حداقل پایه'}</InputLabel>
              <Select
                value={data?.min_grade || ''}
                onChange={putData}
                name='min_grade'
                label='حداقل پایه'>
                {grades.map((g) => (
                  <MenuItem key={g.value} value={g.value}>
                    {g.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>{'حداکثر پایه'}</InputLabel>
              <Select
                value={data?.max_grade || ''}
                onChange={putData}
                name='max_grade'
                label='حداکثر پایه'>
                {grades.map((g) => (
                  <MenuItem key={g.value} value={g.value}>
                    {g.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </>
      )}

      <Grid item xs={12} md={6}>
        <JalaliDataTimePicker
          label='شروع ثبت‌نام'
          value={data?.start_date || ''}
          setValue={setSinceField} />
      </Grid>

      <Grid item xs={12} md={6}>
        <JalaliDataTimePicker
          label='پایان ثبت‌نام'
          value={data?.end_date || ''}
          setValue={setTillField} />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          value={data?.max_registrants || ''}
          fullWidth
          variant='outlined'
          label={'ظرفیت دوره'}
          name='max_registrants'
          onChange={putData} />
      </Grid>
    </Grid>
  );
}

export default FormInfo;