import React, { FC, useRef, useState } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Input,
  Button,
  LinearProgress,
  Stack,
  Typography,
  Link,
  Grid,
} from '@mui/material';
import { useGetFilmsQuery } from 'apps/film-bazi/redux/slices/Film';
import { useAddNewDiscountCodesMutation } from 'apps/film-bazi/redux/slices/DiscountCode';
import { toast } from 'react-toastify';

type BulkAddNewDiscountCodesProps = {};

const BulkAddNewDiscountCodes: FC<BulkAddNewDiscountCodesProps> = () => {
  const { data: films = [] } = useGetFilmsQuery();
  const [addNewDiscountCodes, { isLoading }] = useAddNewDiscountCodesMutation();
  const [filmId, setFilmId] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async () => {
    if (!filmId || !fileInputRef.current?.files?.[0]) {
      toast.error('لطفاً نام فیلم را وارد کنید و فایل انتخاب کنید.');
      return;
    }

    try {
      await addNewDiscountCodes({
        filmId,
        file: fileInputRef.current.files[0],
      }).unwrap();
      toast.success('فایل با موفقیت بارگذاری شد.');

      // Reset file input
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
          {'بارگذاری کدهای تخفیف جدید'}
        </Typography>
        <Link
          href="https://kamva-minio-storage.darkube.app/sepid/projects/filmbazi/add-new-discount-codes-sample.xlsx"
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

export default BulkAddNewDiscountCodes;