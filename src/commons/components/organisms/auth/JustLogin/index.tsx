import {
  Button,
  Stack,
  Typography,
} from '@mui/material';
import React, { FC, useState } from 'react';
import { useSimpleLoginMutation } from 'commons/redux/apis/party/UserApi';
import UsernameField from 'commons/components/molecules/form-fields/UsernameField';
import PasswordField from 'commons/components/molecules/form-fields/Password';

type PropsType = {};

const JustLogin: FC<PropsType> = ({ }) => {
  const [data, setData] = useState({
    username: '',
    password: '',
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
          label={"نام کاربری"}
        />
        <PasswordField
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
    </Stack>
  );
};

export default JustLogin;