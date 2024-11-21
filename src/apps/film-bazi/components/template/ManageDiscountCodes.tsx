import {
  Stack,
  Typography,
  Button,
  LinearProgress,
  Input,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';
import React, { FC, useState } from 'react';
import { useUploadExcelMutation } from 'apps/film-bazi/redux/slices/DiscountCode';
import { useGetFilmsQuery } from 'apps/film-bazi/redux/slices/Film';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type PropsType = {}

const ManageDiscountCodes: FC<PropsType> = () => {
  const { data: films = [] } = useGetFilmsQuery();
  const [uploadExcel, { isLoading, isSuccess, isError, error }] = useUploadExcelMutation();
  const [filmId, setFilmId] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!filmId || !file) {
      toast.error('لطفاً نام فیلم را وارد کنید و فایل انتخاب کنید.');
      return;
    }

    try {
      await uploadExcel({ filmId, file }).unwrap();
      toast.success('فایل با موفقیت بارگذاری شد.');
      setFilmId('');
      setFile(null);
    } catch (err) {
      console.error('خطا در بارگذاری فایل:', err);
      toast.error('خطا در بارگذاری فایل.');
    }
  };

  return (
    <Stack spacing={2} padding={2} alignItems="stretch" justifyContent="center">
      <Stack spacing={2}>
        <Stack direction="row" justifyContent="space-between" alignItems="start">
          <Typography variant="h2" gutterBottom>
            {'کدهای تخفیف'}
          </Typography>
        </Stack>
      </Stack>

      <Stack spacing={2}>
        <FormControl required fullWidth>
          <InputLabel>فیلم</InputLabel>
          <Select
            value={filmId}
            onChange={(e) => setFilmId(e.target.value)}
            label="فیلم"
          >
            {films.map(film =>
              <MenuItem key={film.id} value={film.id}>
                {film.name}
              </MenuItem>
            )}
          </Select>
        </FormControl>
        <Input
          type="file"
          onChange={handleFileChange}
          inputProps={{ accept: '.xlsx, .xls' }}
        />
        <Button
          variant="contained"
          onClick={handleUpload}
          disabled={isLoading || !file || !filmId}
        >
          {isLoading ? 'در حال بارگذاری...' : 'بارگذاری فایل'}
        </Button>
      </Stack>

      {isLoading && <LinearProgress />}

    </Stack>
  );
};

export default ManageDiscountCodes;
