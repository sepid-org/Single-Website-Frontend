import React, { FC, Fragment, useEffect } from 'react';
import {
  Typography,
} from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { useUuidLoginMutation } from 'commons/redux/apis/party/UserApi';

type PropsType = {}

const ShadLogin: FC<PropsType> = ({ }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const userId = searchParams.get('UserID');
  const [uuidLogin, uuidLoginResult] = useUuidLoginMutation();

  useEffect(() => {
    if (userId) {
      uuidLogin({ userId });
    }
  }, [userId])

  if (uuidLoginResult.isLoading) {
    return (
      <Typography>
        {'در حال انتقال...'}
      </Typography>
    );
  }

  if (uuidLoginResult.isError) {
    return (
      <Fragment>
        <Typography>
          {'ورود موفقیت‌آمیز نبود:'}
        </Typography>
        <Typography>
          {uuidLoginResult.error['data'].error}
        </Typography>
      </Fragment>
    );
  }

  return (
    <Typography>
      {'شناسه‌ی کاربر دریافت نشد'}
    </Typography>
  );

};

export default ShadLogin;