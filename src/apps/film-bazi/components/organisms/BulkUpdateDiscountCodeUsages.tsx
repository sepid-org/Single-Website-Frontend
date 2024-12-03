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

type BulkUpdateDiscountCodeUsagesProps = {};

const BulkUpdateDiscountCodeUsages: FC<BulkUpdateDiscountCodeUsagesProps> = ({
}) => {
  const { data: films = [] } = useGetFilmsQuery();
  const [filmId, setFilmId] = useState<string>('');
  const [updateDiscountCodes, { isLoading }] = useUpdateDiscountCodesMutation();
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      await updateDiscountCodes({ filmId, file }).unwrap();
      toast.success('فایل با موفقیت بارگذاری شد.');

      // Reset file input
      setFile(null);

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
              ref={fileInputRef}
              fullWidth
              type="file"
              onChange={handleFileChange}
              inputProps={{ accept: '.xlsx, .xls' }}
            />
          </Grid>
        </Grid>
      </Stack>
      <Button
        variant="contained"
        onClick={handleUpload}
        disabled={isLoading || !file}
      >
        {isLoading ? 'در حال بارگذاری...' : 'بارگذاری فایل'}
      </Button>
      {isLoading && <LinearProgress />}
    </Stack>
  );
};

export default BulkUpdateDiscountCodeUsages;
