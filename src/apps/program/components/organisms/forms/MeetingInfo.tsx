import React, { FC } from 'react';
import moment from 'moment-jalaali';
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import 'moment/locale/fa';

import { MeetingType } from 'apps/program/template/types';
import { toEnglishNumber } from 'commons/utils/translateNumber';

type MeetingInfoFormProps = {
  data: Partial<MeetingType>;
  setData: (
    updater: Partial<MeetingType> | ((prev: Partial<MeetingType>) => Partial<MeetingType>)
  ) => void;
};

const MeetingInfo: FC<MeetingInfoFormProps> = ({ data, setData }) => {
  moment.loadPersian({ dialect: 'persian-modern', usePersianDigits: true });
  moment.locale('fa');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name as keyof MeetingType;
    const value = e.target.value;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const name = e.target.name as keyof MeetingType;
    const value = e.target.value as any;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTimeChange = (field: 'start_time' | 'end_time') =>
    (value: moment.Moment | null) => {
      const timeString = value ? value.format('HH:mm:ss') : '';
      setData((prev) => ({ ...prev, [field]: toEnglishNumber(timeString) }));
    };

  return (
    <Grid container spacing={2} dir="rtl">
      {/* Title */}
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="عنوان"
          name="title"
          value={data.title ?? ''}
          onChange={handleInputChange}
        />
      </Grid>

      {/* Description */}
      <Grid item xs={12}>
        <TextField
          fullWidth
          multiline
          minRows={3}
          label="توضیحات"
          name="description"
          value={data.description ?? ''}
          onChange={handleInputChange}
        />
      </Grid>

      {/* Start Time (Jalali TimePicker with seconds) */}
      <Grid item xs={12} md={6}>
        <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="fa">
          <TimePicker
            label="زمان شروع"
            value={data.start_time ? moment(data.start_time, 'HH:mm:ss') : null}
            onChange={handleTimeChange('start_time')}
            ampm={false}
            views={['hours', 'minutes']}
            slotProps={{ textField: { fullWidth: true, inputProps: { placeholder: 'HH:mm:ss' } } }}
          />
        </LocalizationProvider>
      </Grid>

      {/* End Time (Jalali TimePicker with seconds) */}
      <Grid item xs={12} md={6}>
        <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="fa">
          <TimePicker
            label="زمان پایان"
            value={data.end_time ? moment(data.end_time, 'HH:mm:ss') : null}
            onChange={handleTimeChange('end_time')}
            ampm={false}
            views={['hours', 'minutes']}
            slotProps={{ textField: { fullWidth: true, inputProps: { placeholder: 'HH:mm:ss' } } }}
          />
        </LocalizationProvider>
      </Grid>

      {/* Location Type */}
      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel>چگونگی برگزاری</InputLabel>
          <Select
            label="چگونگی برگزاری"
            name="location_type"
            value={data.location_type ?? ''}
            onChange={handleSelectChange}
          >
            <MenuItem value="online">برخط</MenuItem>
            <MenuItem value="physical">حضوری</MenuItem>
            <MenuItem value="hybrid">ترکیبی</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default MeetingInfo;