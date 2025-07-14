import {
  Button,
  Typography,
  Stack,
  Link,
} from '@mui/material';
import React, { useState, FC, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useChangeUserPasswordMutation } from 'commons/redux/apis/party/UserApi';
import VerifyPhoneNumber from 'commons/components/molecules/VerifyPhoneNumber';
import PasswordField from 'commons/components/molecules/form-fields/Password';

type PropsType = {
  setTab: (tab: 'login' | 'create-account' | 'reset-password') => void;
}

const ResetPasswordTab: FC<PropsType> = ({
  setTab,
}) => {
  const [data, setData] = useState({
    password: '',
    phoneNumber: '',
    verificationCode: '',
  });
  const [changePassword, { isLoading, isSuccess }] = useChangeUserPasswordMutation();

  const collectData = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangePassword = () => {
    const { phoneNumber, password } = data;
    if (!phoneNumber || !password) {
      toast.error('لطفاً همه‌ی مواردی که ازت خواسته شده رو پر کن');
      return;
    }
    changePassword(data);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success('گذر‌واژه‌ی شما با موفقیت تغییر یافت.')
      setTab('login');
    }
  }, [isSuccess])

  return (
    <Stack
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          handleChangePassword();
        }
      }}
      width={'100%'}
      spacing={1.5}
    >
      <Typography
        paddingBottom={2}
        component='h1' variant='h3' align='center'>
        {'بازنشانی گذر‌واژه'}
      </Typography>

      <VerifyPhoneNumber
        data={data}
        setData={setData}
        verificationType='change-user-password'
        label={"شماره تلفن همراه"}
      />

      <PasswordField
        onTabChange={setTab}
        label='گذرواژه جدید'
        onChange={collectData}
      />

      <Button
        onClick={handleChangePassword}
        variant="contained"
        color="primary"
        disabled={isLoading}
        fullWidth>
        تغییر
      </Button>

      <Typography align="center" pt={1}>
        {'حساب کاربری دارید؟'}
        <Link
          component="button"
          underline="none"
          sx={{
            marginLeft: 0.5,
            fontWeight: 800,
            color: '#1361A4',
          }}
          onClick={() => setTab('login')}
        >
          {'ورود'}
        </Link>
      </Typography>
    </Stack>
  )
}

export default ResetPasswordTab;