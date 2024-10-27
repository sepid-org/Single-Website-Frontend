import React, { FC, useState } from 'react';
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
import { useCreateAccountMutation } from 'apps/website-display/redux/features/user/UserSlice';
import { DarkSecondary } from '../../constants/colors';
import ProgramLogo from 'commons/components/atoms/logos/ProgramLogo';
import bg from "../../assets/loginBG.jpg";
import PasswordField from 'commons/components/molecules/form-fields/Password';

type CreateAccountPropsType = {}

const CreateAccount: FC<CreateAccountPropsType> = ({ }) => {
  const [createAccount, { isLoading }] = useCreateAccountMutation();
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    password: '',
    confirmationPassword: '',
    verificationCode: '',
  });

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

        <Stack
          width={'100%'}
          component={Paper}
          spacing={2}
          padding={4}
          alignItems={'center'}>

          <Box>
            <ProgramLogo size='large' destination='http://filmbazi.ir/' />
          </Box>

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
              size='large'
              fullWidth>
              <Typography fontWeight={700} color={DarkSecondary}>
                {'ثبت'}
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
    </Container >
  )
}

export default CreateAccount;