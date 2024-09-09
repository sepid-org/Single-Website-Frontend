import React, { FC, useEffect, useState } from 'react';
import {
  Button,
  TextField,
  Container,
  Paper,
  Stack,
  Typography,
  Box,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import VerifyPhoneNumber from 'commons/components/molecules/VerifyPhoneNumber';
import WebsiteLogo from 'commons/components/atoms/logos/WebsiteLogo';
import { useCreateAccountMutation } from '../redux/features/user/UserSlice';
import { useGetWebsiteQuery } from '../redux/features/WebsiteSlice';

type CreateAccountPropsType = {}

const CreateAccount: FC<CreateAccountPropsType> = ({ }) => {
  const navigate = useNavigate();
  const [createAccount, { isLoading }] = useCreateAccountMutation();
  const { data: website } = useGetWebsiteQuery();
  const accessToken = useSelector((state: any) => state.account.accessToken);
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    password: '',
    confirmationPassword: '',
    verificationCode: '',
  });

  useEffect(() => {
    if (accessToken) {
      navigate('/programs/');
      toast.success(`به ${website.display_name} خوش آمدید!`)
    }
  }, [navigate, accessToken])

  const collectData = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleCreatingAccount = () => {
    const { phoneNumber, password, confirmationPassword, firstName, lastName } = data;
    if (!phoneNumber || !password || !confirmationPassword || !firstName || !lastName) {
      toast.error('همه‌ی موارد خواسته شده را پر کن');
      return;
    }

    if (password !== confirmationPassword) {
      toast.error('رمزهای وارد شده مشابه نیستند');
      return;
    }
    createAccount(data);
  };

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
                handleCreatingAccount();
              }
            }}
            width={'100%'}
            spacing={1.5}>

            <Typography
              paddingBottom={2}
              component='h1' variant='h3' align='center'>
              {'ایجاد حساب کاربری'}
            </Typography>

            <TextField
              variant="outlined"
              fullWidth
              onChange={collectData}
              value={data.firstName}
              name="firstName"
              label="نام"
              type='text'
              inputMode='text'
            />

            <TextField
              variant="outlined"
              fullWidth
              onChange={collectData}
              value={data.lastName}
              name="lastName"
              label="نام خانوادگی"
              type='text'
              inputMode='text'
            />

            <VerifyPhoneNumber
              data={data}
              setData={setData}
              verificationType='create-user-account'
            />

            <TextField
              variant="outlined"
              fullWidth
              onChange={collectData}
              label="گذر‌واژه"
              name="password"
              inputProps={{ className: 'ltr-input' }}
              type="password"
              inputMode='text'
            />

            <TextField
              variant="outlined"
              fullWidth
              onChange={collectData}
              label="تکرار گذر‌واژه"
              inputProps={{ className: 'ltr-input' }}
              name="confirmationPassword"
              type="password"
              inputMode='text'
            />

            <Button
              onClick={handleCreatingAccount}
              variant="contained"
              color="primary"
              disabled={isLoading}
              fullWidth>
              ثبت
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
    </Container >
  )
}

export default CreateAccount;