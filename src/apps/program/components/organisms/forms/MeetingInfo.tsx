import React, { FC, useState } from 'react';
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
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterMomentJalaali } from '@mui/x-date-pickers/AdapterMomentJalaali';
import 'moment/locale/fa';

import { MeetingType } from 'apps/program/template/types';
import { toEnglishNumber, toPersianNumber } from 'commons/utils/translateNumber';

type MeetingInfoFormProps = {
  data: Partial<MeetingType>;
  setData: (
    updater: Partial<MeetingType> | ((prev: Partial<MeetingType>) => Partial<MeetingType>)
  ) => void;
};

const MAX_MEETING_DURATION = 180;

const MeetingInfo: FC<MeetingInfoFormProps> = ({ data, setData }) => {
  moment.loadPersian({ dialect: 'persian-modern', usePersianDigits: true });
  moment.locale('fa');
  const [durationError, setDurationError] = useState(false);

  // Convert HH:mm:ss to total minutes
  const durationToMinutes = (timeString: string) => {
    const [hours = '0', minutes = '0'] = timeString.split(':');
    return parseInt(hours, 10) * 60 + parseInt(minutes, 10);
  };

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

  const handleStartTimeChange = (value: moment.Moment | null) => {
    if (!value) return;
    const formatted = value.format('YYYY-MM-DDTHH:mm:ss');
    setData((prev) => ({ ...prev, start_time: toEnglishNumber(formatted) }));
  };

  const handleDurationChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const rawMinutes = parseInt(e.target.value, 10) || 0;
    const minutes = Math.min(rawMinutes, MAX_MEETING_DURATION);

    setDurationError(rawMinutes > MAX_MEETING_DURATION);

    const dur = moment.duration(minutes, 'minutes');
    const timeString = `${String(dur.hours()).padStart(2, '0')}:${String(dur.minutes()).padStart(2, '0')}:00`;
    setData((prev) => ({ ...prev, duration: timeString }));
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

      {/* Jalali DateTimePicker */}
      <Grid item xs={12} md={6}>
        <LocalizationProvider
          dateAdapter={AdapterMomentJalaali}
          adapterLocale="fa"
        >
          <DateTimePicker
            label="زمان و تاریخ شروع"
            value={data.start_time ? moment(data.start_time, 'YYYY-MM-DDTHH:mm:ss') : null}
            onChange={handleStartTimeChange}
            format="jYYYY/jMM/jDD HH:mm:ss"
            ampm={false}
            slotProps={{
              textField: {
                fullWidth: true,
                placeholder: '۱۳۸۰/۰۱/۰۱ ۱۲:۰۰:۰۰',
              },
            }}
          />
        </LocalizationProvider>
      </Grid>

      {/* Duration in minutes */}
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          type="number"
          label="مدت زمان (دقیقه)"
          name="duration"
          inputProps={{ min: 1, max: MAX_MEETING_DURATION }}
          value={data.duration ? durationToMinutes(data.duration) : ''}
          onChange={handleDurationChange}
          error={durationError}
          helperText={durationError && `حداکثر مدت زمان جلسه ${toPersianNumber(MAX_MEETING_DURATION)} دقیقه می‌باشد!`}
        />
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