import React, { FC } from 'react';
import {
  Typography,
} from '@mui/material';
import { useSearchParams } from 'react-router-dom';

type PropsType = {}

const ShadLogin: FC<PropsType> = ({ }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const userUUID = searchParams.get('UserID');

  if (userUUID) {
    return (
      <Typography>
        {`شناسه‌ی کاربر (${userUUID}) با موفقیت دریافت شد`}
      </Typography>
    )
  }

  return (
    <Typography>
      {'شناسه‌ی کاربر دریافت نشد'}
    </Typography>
  )

};

export default ShadLogin;