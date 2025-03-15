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
import { useGetWebsiteQuery } from 'apps/website-display/redux/features/WebsiteSlice';
import WebsiteLogo from 'commons/components/atoms/logos/WebsiteLogo';
import { useSimpleLoginMutation } from 'commons/redux/apis/party/UserApi';
import UsernameField from 'commons/components/molecules/form-fields/UsernameField';
import PasswordField from 'commons/components/molecules/form-fields/Password';

type LoginPagePropsType = {};

const LoginPage: FC<LoginPagePropsType> = ({ }) => {
  const [data, setData] = useState({
    password: '',
    username: '',
  });
  const { data: website } = useGetWebsiteQuery();
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
            {`ورود به ${website?.title}`}
          </Typography>

          <Stack width={'100%'} spacing={2.5}>
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
                onChange={collectData}
                resetPasswordLink='/reset-password/'
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