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
} from '@mui/material';
import { useGetFilmsQuery } from 'apps/film-bazi/redux/slices/Film';
import { useUploadExcelMutation } from 'apps/film-bazi/redux/slices/DiscountCode';
import { toast } from 'react-toastify';

type BulkUploadDiscountCodesProps = {};

const BulkUploadDiscountCodes: FC<BulkUploadDiscountCodesProps> = ({
}) => {
  const { data: films = [] } = useGetFilmsQuery();
  const [uploadExcel, { isLoading }] = useUploadExcelMutation();
  const [filmId, setFilmId] = useState<string>('');
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
      await uploadExcel({ filmId, file }).unwrap();
      toast.success('فایل با موفقیت بارگذاری شد.');

      // Reset file input
      setFilmId('');
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
          {'بارگذاری کدهای تخفیف جدید'}
        </Typography>
        <Link
          href="https://kamva-minio-storage.darkube.app/sepid/projects/filmbazi/upload-discount-codes-sample.xlsx"
          target="_blank"
          rel="noopener noreferrer"
        >
          (نمونه فایل)
        </Link>
      </Stack>

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
      {isLoading && <LinearProgress />}
    </Stack>
  );
};

export default BulkUploadDiscountCodes;
