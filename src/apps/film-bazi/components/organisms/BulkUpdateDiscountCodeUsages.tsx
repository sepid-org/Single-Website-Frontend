import React, { FC, useRef, useState } from 'react';
import {
  Input,
  Button,
  LinearProgress,
  Stack,
  Typography,
  Link,
} from '@mui/material';
import { useUploadExcelMutation } from 'apps/film-bazi/redux/slices/DiscountCode';
import { toast } from 'react-toastify';

type BulkUpdateDiscountCodeUsagesProps = {};

const BulkUpdateDiscountCodeUsages: FC<BulkUpdateDiscountCodeUsagesProps> = ({
}) => {
  const [uploadExcel, { isLoading }] = useUploadExcelMutation();
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error('لطفاً فایل انتخاب کنید.');
      return;
    }

    try {
      await uploadExcel({ file }).unwrap();
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
          {'به‌روز‌رسانی تعدادبار‌های استفاده'}
        </Typography>
        <Link
          href="https://kamva-minio-storage.darkube.app/sepid/projects/filmbazi/upload-discount-codes-sample.xlsx"
          target="_blank"
          rel="noopener noreferrer"
        >
          (نمونه فایل)
        </Link>
      </Stack>

      <Input
        type="file"
        onChange={handleFileChange}
        inputProps={{ accept: '.xlsx, .xls' }}
      />
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
