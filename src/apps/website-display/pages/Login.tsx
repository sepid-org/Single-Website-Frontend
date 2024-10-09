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
import GoogleLogin from 'commons/components/molecules/GoogleLogin';
import { useLoginMutation } from 'apps/website-display/redux/features/user/UserSlice';
import { useGetWebsiteQuery } from 'apps/website-display/redux/features/WebsiteSlice';
import WebsiteLogo from 'commons/components/atoms/logos/WebsiteLogo';
import { toast } from 'react-toastify';

type LoginPagePropsType = {};

const LoginPage: FC<LoginPagePropsType> = ({ }) => {
  const [data, setData] = useState({
    password: '',
    username: '',
  });
  const { data: website } = useGetWebsiteQuery();
  const [login, { isLoading }] = useLoginMutation();

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
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Stack
        spacing={5}
        alignItems={'center'}
        width={400}>

        {isUserTokenExpired &&
          <Typography align='center' variant='h5' color={'error'}>{'نشست شما به پایان رسیده. لطفاً دوباره وارد سامانه شوید.'}</Typography>
        }
        <Box pb={2}>
          <WebsiteLogo size='large' />
        </Box>


        <Stack
          width={'100%'}
          component={Paper}
          spacing={4}
          padding={2}
          alignItems={'center'}>

          <Typography
            paddingBottom={2}
            component="h1"
            variant="h3"
            textAlign={'center'}>
            {'ورود به سامانه'}
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
                label="شماره تلفن همراه، ایمیل یا نام کاربری"
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
                    <Link style={{ textDecoration: 'none' }} to={'/reset-password/'}>
                      {'فراموشی گذر‌واژه'}
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
                fullWidth>
                ورود
              </Button>
              {(website?.has_login_with_google && process.env.REACT_APP_GOOGLE_CLIENT_ID) &&
                <GoogleLogin />
              }
            </Stack>
          </Stack>

          <Typography align='center'>
            {'حساب کاربری ندارید؟'}
            <Link style={{ textDecoration: 'none', marginRight: 4, fontWeight: 800, color: '#1361A4' }} to={'/create-account/'}>
              {'ثبت‌نام'}
            </Link>
          </Typography>
        </Stack>
      </Stack>
    </Container>
  );
};

export default LoginPage;