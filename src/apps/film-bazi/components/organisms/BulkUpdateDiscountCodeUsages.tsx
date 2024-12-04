import React, { FC, useRef, useState } from 'react';
import {
  Input,
  Button,
  LinearProgress,
  Stack,
  Typography,
  Link,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Grid,
} from '@mui/material';
import { useUpdateDiscountCodesMutation } from 'apps/film-bazi/redux/slices/DiscountCode';
import { toast } from 'react-toastify';
import { useGetFilmsQuery } from 'apps/film-bazi/redux/slices/Film';
import CustomWarning from '../atoms/chips/CustomWarning';

type BulkUpdateDiscountCodeUsagesProps = {};

const BulkUpdateDiscountCodeUsages: FC<BulkUpdateDiscountCodeUsagesProps> = () => {
  const { data: films = [] } = useGetFilmsQuery();
  const [filmId, setFilmId] = useState<string>('');
  const [updateDiscountCodes, { isLoading }] = useUpdateDiscountCodesMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async () => {
    if (!filmId || !fileInputRef.current?.files?.[0]) {
      toast.error('لطفاً نام فیلم را وارد کنید و فایل انتخاب کنید.');
      return;
    }

    try {
      await updateDiscountCodes({
        filmId,
        file: fileInputRef.current.files[0]
      }).unwrap();

      toast.success('فایل با موفقیت بارگذاری شد.');

      // Reset form
      setFilmId('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

    } catch (err) {
      console.error('خطا در بارگذاری فایل:', err);
      toast.error('خطا در بارگذاری فایل.');
    }
  };

  return (
    <Stack spacing={2}>
      <Stack direction={'row'} spacing={1} alignItems={'end'}>
        <Typography variant="h3" gutterBottom>
          {'به‌روز‌رسانی تعداد بار‌های استفاده'}
        </Typography>
        <Link
          href="https://kamva-minio-storage.darkube.app/sepid/projects/filmbazi/update-discount-codes-sample.xlsx"
          target="_blank"
          rel="noopener noreferrer"
        >
          (نمونه فایل)
        </Link>
      </Stack>

      <CustomWarning text={'توجه کنید که با هر بار بارگذاری فایل، مقادیر موجود برای هر کد تخفیف به مقادیر قبلی آن اضافه می‌شوند.'} />

      <Stack>
        <Grid container spacing={2} alignItems={'end'}>
          <Grid item xs={12} sm={6}>
            <FormControl required fullWidth>
              <InputLabel>فیلم</InputLabel>
              <Select
                value={filmId}
                onChange={(e) => setFilmId(e.target.value)}
                label="فیلم"
              >
                {films.map((film) => (
                  <MenuItem key={film.id} value={film.id}>
                    {film.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Input
              inputRef={fileInputRef}
              fullWidth
              type="file"
              inputProps={{ accept: '.xlsx, .xls' }}
            />
          </Grid>
        </Grid>
      </Stack>

      <Button
        variant="contained"
        onClick={handleUpload}
        disabled={isLoading || !filmId}
      >
        {isLoading ? 'در حال بارگذاری...' : 'بارگذاری فایل'}
      </Button>
      {isLoading && <LinearProgress />}
    </Stack>
  );
};

export default BulkUpdateDiscountCodeUsages;