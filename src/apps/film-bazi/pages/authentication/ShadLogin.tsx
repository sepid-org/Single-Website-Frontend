import React, { FC, Fragment, useEffect } from 'react';
import {
  Typography,
} from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { useUuidLoginMutation } from 'commons/redux/apis/party/UserApi';
import useLocalNavigate from 'apps/film-bazi/hooks/useLocalNavigate';
import { FILMBAZI_ORIGIN_NAME, FILMBAZI_SHAD_LANDING_ID } from 'apps/film-bazi/constants/game';

function convertToUUID(str: string): string {
  // Remove any non-alphanumeric characters, just in case
  const cleaned = str.replace(/[^a-fA-F0-9]/g, '');

  // Ensure the cleaned string has 32 characters (UUID has 32 hex digits)
  if (cleaned.length !== 32) {
    throw new Error('Invalid input string length, expected 32 hexadecimal characters.');
  }

  // Convert to UUID format: 8-4-4-4-12 (8 chars - 4 chars - 4 chars - 4 chars - 12 chars)
  const uuid = cleaned.replace(
    /^([a-fA-F0-9]{8})([a-fA-F0-9]{4})([a-fA-F0-9]{4})([a-fA-F0-9]{4})([a-fA-F0-9]{12})$/,
    '$1-$2-$3-$4-$5'
  );
  return uuid;
}

type PropsType = {}

const ShadLogin: FC<PropsType> = ({ }) => {
  const localNavigate = useLocalNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const userId = convertToUUID(searchParams.get('UserID'));
  const [uuidLogin, uuidLoginResult] = useUuidLoginMutation();

  useEffect(() => {
    if (userId) {
      uuidLogin({
        userId,
        landingId: FILMBAZI_SHAD_LANDING_ID,
        origin: FILMBAZI_ORIGIN_NAME,
      });
    }
  }, [userId]);

  useEffect(() => {
    if (uuidLoginResult.isSuccess) {
      localNavigate('/');
    }
  }, [uuidLoginResult]);

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
          {uuidLoginResult.error?.['data']?.error}
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