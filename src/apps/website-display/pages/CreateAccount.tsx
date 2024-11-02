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
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import VerifyPhoneNumber from 'commons/components/molecules/VerifyPhoneNumber';
import WebsiteLogo from 'commons/components/atoms/logos/WebsiteLogo';
import PasswordField from 'commons/components/molecules/form-fields/Password';
import { useCreateAccountMutation } from 'commons/redux/apis/party/UserApi';

type CreateAccountPropsType = {}

const CreateAccount: FC<CreateAccountPropsType> = ({ }) => {
  const [createAccount, { isLoading }] = useCreateAccountMutation();
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    password: '',
    verificationCode: '',
  });

  const collectData = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleCreatingAccount = () => {
    const { phoneNumber, password, firstName, lastName } = data;
    if (!phoneNumber || !password || !firstName || !lastName) {
      toast.error('همه‌ی موارد خواسته شده را پر کن');
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

            <PasswordField collectData={collectData} />

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