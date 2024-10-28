import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSimpleLoginMutation } from 'commons/redux/slices/party/UserApi';
import { DarkSecondary } from '../../constants/colors';
import ProgramLogo from 'commons/components/atoms/logos/ProgramLogo';
import bg from "../../assets/loginBG.jpg";
import { useGetWebsiteQuery } from 'apps/website-display/redux/features/WebsiteSlice';

type LoginPagePropsType = {};

const LoginPage: FC<LoginPagePropsType> = ({ }) => {
  const [data, setData] = useState({
    password: '',
    username: '',
  });
  const [login, { isLoading }] = useSimpleLoginMutation();
  const { data: website } = useGetWebsiteQuery();

  const collectData = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const regularLogin = () => {
    const { username, password } = data;
    if (!username || !password) {
      return;
    }
    login(data);
  };

  const isUserTokenExpired = window.location.href.includes('token-expiration');

  return (
    <Container
      maxWidth={false}
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `url(${bg})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Stack
        spacing={4}
        alignItems={'center'}
        width={440}>

        {isUserTokenExpired &&
          <Typography align='center' variant='h5' fontWeight={900}>{'نشست شما به پایان رسیده. لطفاً دوباره وارد سامانه شوید.'}</Typography>
        }

        <Stack
          width={'100%'}
          component={Paper}
          spacing={4}
          padding={4}
          alignItems={'center'}>

          <Box>
            <ProgramLogo size='large' destination='http://filmbazi.ir/' />
          </Box>

          <Typography
            paddingBottom={2}
            component="h1"
            variant="h3"
            textAlign={'center'}>
            {`ورود به ${website?.display_name}`}
          </Typography>

          <Stack width={'100%'} spacing={2.5}>
            <Stack
              width={'100%'}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  regularLogin();
                }
              }}
              spacing={1.5}>

              <TextField
                autoComplete="on"
                variant="outlined"
                fullWidth
                onChange={collectData}
                value={data.username}
                name="username"
                label="شماره تلفن همراه"
                inputProps={{ className: 'ltr-input' }}
                type='text'
                inputMode='text'
              />

              <TextField
                autoComplete="on"
                variant="outlined"
                fullWidth
                onChange={collectData}
                label="گذر‌واژه"
                name="password"
                inputProps={{ className: 'ltr-input' }}
                type="password"
                inputMode='text'
                FormHelperTextProps={{
                  sx: {
                    marginRight: 0,
                    marginLeft: 'auto',
                    marginTop: 0.5,
                    textAlign: 'right',
                  }
                }}
                helperText={
                  <Typography component="span">
                    <Link style={{ textDecoration: 'none' }} to={'/program/filmbazi/reset-password/'}>
                      {'رمز عبور را فراموش کرده‌ام'}
                    </Link>
                  </Typography>
                }
              />
            </Stack>
            <Stack width={'100%'} spacing={1.5}>
              <Button
                onClick={regularLogin}
                variant="contained"
                color="primary"
                disabled={isLoading}
                size='large'
                fullWidth>
                <Typography fontWeight={700} color={DarkSecondary}>
                  {'ورود'}
                </Typography>
              </Button>
            </Stack>
          </Stack>

          <Typography align='center'>
            {'حساب کاربری ندارید؟'}
            <Link style={{ textDecoration: 'none', marginRight: 4, fontWeight: 800, color: '#1361A4' }} to={'/program/filmbazi/create-account/'}>
              {'ثبت‌نام'}
            </Link>
          </Typography>
        </Stack>
      </Stack>
    </Container>
  );
};

export default LoginPage;