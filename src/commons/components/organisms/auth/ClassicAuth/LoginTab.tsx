import {
  Button,
  Stack,
  Typography,
  Link,
} from '@mui/material';
import React, { FC, useState } from 'react';
import { useSimpleLoginMutation } from 'commons/redux/apis/party/UserApi';
import UsernameField from 'commons/components/molecules/form-fields/UsernameField';
import PasswordField from 'commons/components/molecules/form-fields/Password';
import { useSearchParams } from 'react-router-dom';

type PropsType = {};

const LoginTab: FC<PropsType> = () => {
  const [data, setData] = useState({
    password: '',
    username: '',
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const [simpleLogin, { isLoading }] = useSimpleLoginMutation();

  const collectData = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleSimpleLogin = () => {
    const { username, password } = data;
    if (!username || !password) {
      return;
    }
    simpleLogin(data);
  };

  return (
    <Stack width={'100%'} spacing={2.5}>
      <Typography
        paddingBottom={2}
        component="h1"
        variant="h3"
        textAlign="center"
      >
        {'ورود'}
      </Typography>

      <Stack
        width={'100%'}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            handleSimpleLogin();
          }
        }}
        spacing={1.5}
      >

        <UsernameField
          onChange={collectData}
          username={data.username}
          label={"شماره تلفن همراه، ایمیل یا نام کاربری"}
        />
        <Stack spacing={0.5}>
          <PasswordField onChange={collectData} />
          <Typography component="span">
            <Link
              component="button"
              underline="none"
              sx={{ fontWeight: 600 }}
              onClick={() => setSearchParams({ tab: 'reset-password' })}
            >
              {'رمز عبور را فراموش کرده‌ام'}
            </Link>
          </Typography>
        </Stack>

      </Stack>
      <Stack width={'100%'} spacing={1.5}>
        <Button
          onClick={handleSimpleLogin}
          variant="contained"
          color="primary"
          disabled={isLoading}
          fullWidth>
          ورود
        </Button>
      </Stack>

      <Typography align="center" pt={1}>
        {'حساب کاربری ندارید؟'}
        <Link
          component="button"
          underline="none"
          sx={{
            marginLeft: 0.5,
            fontWeight: 700,
          }}
          onClick={() => setSearchParams({ tab: 'create-account' })}
        >
          {'ثبت‌نام'}
        </Link>
      </Typography>
    </Stack>
  );
};

export default LoginTab;