import { Button, Container, Paper, Typography, Stack, Box } from '@mui/material';
import WebsiteLogo from 'commons/components/atoms/logos/WebsiteLogo';
import React, { useState, FC, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useChangeUserPasswordMutation } from 'commons/redux/apis/party/UserApi';
import VerifyPhoneNumber from 'commons/components/molecules/VerifyPhoneNumber';
import PasswordField from 'commons/components/molecules/form-fields/Password';

type ResetPasswordPropsType = {}

const ResetPassword: FC<ResetPasswordPropsType> = ({ }) => {
  const navigate = useNavigate();
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
      navigate('/login/');
    }
  }, [isSuccess])

  return (
    <Container
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>

      <Stack
        spacing={4}
        alignItems={'center'}
        width={400}>

        <Box pb={2}>
          <WebsiteLogo size='large' />
        </Box>

        <Stack
          width={'100%'}
          component={Paper}
          spacing={2}
          padding={2}
          alignItems={'center'}>

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

            <PasswordField label='گذرواژه جدید' onChange={collectData} />

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
              <Link style={{ textDecoration: 'none', marginRight: 4, fontWeight: 800, color: '#1361A4' }} to={'/login/'}>
                {'ورود'}
              </Link>
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  )
}

export default ResetPassword;