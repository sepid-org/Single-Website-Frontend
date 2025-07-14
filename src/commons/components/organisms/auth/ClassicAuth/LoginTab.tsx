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

type PropsType = {
  setTab: (tab: 'login' | 'create-account' | 'reset-password') => void;
};

const LoginTab: FC<PropsType> = ({
  setTab,
}) => {
  const [data, setData] = useState({
    password: '',
    username: '',
  });
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
        spacing={1.5}>

        <UsernameField
          onChange={collectData}
          username={data.username}
          label={"شماره تلفن همراه، ایمیل یا نام کاربری"}
        />
        <PasswordField
          onTabChange={setTab}
          onChange={collectData}
        />
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
            fontWeight: 800,
            color: '#1361A4',
          }}
          onClick={() => setTab('create-account')}
        >
          {'ثبت‌نام'}
        </Link>
      </Typography>
    </Stack>
  );
};

export default LoginTab;