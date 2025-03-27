import {
  Button,
  CircularProgress,
  Stack,
} from '@mui/material';
import React, { FC, Fragment, useEffect } from 'react';
import { toast } from 'react-toastify'
import { useUploadFileWithProgress } from 'commons/hooks/useUploadFileWithProgress';

type UploadImagePropsType = {
  file?: any;
  setFile?: any;
  showImageSelf?: boolean;
}

const UploadImage: FC<UploadImagePropsType> = ({
  setFile,
  file,
  showImageSelf = false,
}) => {
  const { uploadFile, result, progress } = useUploadFileWithProgress();

  const validateFile = (file) => {
    if (file.name.length > 100) {
      toast.error('حداکثر طول نام فایل حداکثر ۱۰۰ کاراکتر است.');
      return false;
    }
    if (file.size >= 4e6) {
      toast.error('حداکثر حجم فایل ۳ مگابایت است.');
      return false;
    }
    return true;
  };

  const handleUploadFile = (event) => {
    if (!event.target.files?.[0]) return;
    const file = event.target.files[0];
    if (!validateFile(file)) return;
    uploadFile({ file });
  };

  useEffect(() => {
    if (result.data) {
      setFile(result.data.file);
    }
  }, [result])

  return (
    <Fragment>
      <Stack direction={'row'} alignItems={'end'} spacing={1}>
        {showImageSelf &&
          <img src={file} width={100} style={{ borderRadius: 8 }} />
        }
        <Button
          size='small'
          disabled={result.isLoading}
          endIcon={
            progress &&
            <CircularProgress color='secondary' thickness={4} size={24} variant="determinate" value={progress} />
          }
          variant="contained"
          color="secondary"
          onClick={() => document.getElementById('userProfilePicture').click()}>
          {'انتخاب تصویر (اختیاری)'}
        </Button>
      </Stack>
      <input
        accept="image/*"
        id="userProfilePicture"
        style={{ display: 'none' }}
        type="file"
        onChange={handleUploadFile}
      />
    </Fragment>
  );
}

export default UploadImage;