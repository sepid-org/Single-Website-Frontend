import { Button, TextField, Container, Paper, Typography, Stack, Box } from '@mui/material';
import React, { useState, FC, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useChangeUserPasswordMutation } from 'commons/redux/apis/party/UserApi';
import VerifyPhoneNumber from 'commons/components/molecules/VerifyPhoneNumber';
import { DarkSecondary } from '../../constants/colors';
import ProgramLogo from 'commons/components/atoms/logos/ProgramLogo';
import PasswordField from 'commons/components/molecules/form-fields/Password';
import { MediaUrls } from 'apps/film-bazi/constants/mediaUrls';

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

  const doChangePassword = () => {
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
      navigate('/program/filmbazi/login/');
    }
  }, [isSuccess])

  return (
    <Container
      maxWidth={false}
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `url(${MediaUrls.LOGIN_BACKGROUND})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Stack
        spacing={4}
        alignItems={'center'}
        width={440}>

        <Stack
          width={'100%'}
          component={Paper}
          spacing={2}
          padding={4}
          alignItems={'center'}>

          <Box>
            <ProgramLogo size='large' destination='http://filmbazi.ir/' />
          </Box>

          <Stack width={'100%'} spacing={1.5}>

            <Typography
              paddingBottom={2}
              component='h1' variant='h3' align='center'>
              {'بازنشانی گذر‌واژه'}
            </Typography>

            <VerifyPhoneNumber
              data={data}
              setData={setData}
              label={"شماره تلفن همراه"}
              verificationType='change-user-phone-number'
            />

            <PasswordField label='گذرواژه جدید' collectData={collectData} />

            <Button
              onClick={doChangePassword}
              variant="contained"
              color="primary"
              disabled={isLoading}
              size='large'
              fullWidth>
              <Typography fontWeight={700} color={DarkSecondary}>
                {'تغییر'}
              </Typography>
            </Button>

            <Typography align="center" pt={1}>
              {'حساب کاربری دارید؟'}
              <Link style={{ textDecoration: 'none', marginRight: 4, fontWeight: 800, color: '#1361A4' }} to={'/program/filmbazi/login/'}>
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