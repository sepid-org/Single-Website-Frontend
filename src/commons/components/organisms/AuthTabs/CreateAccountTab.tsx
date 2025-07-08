import React, { FC, useState } from 'react';
import {
  Button,
  TextField,
  Stack,
  Typography,
  Link,
} from '@mui/material';
import { toast } from 'react-toastify';
import VerifyPhoneNumber from 'commons/components/molecules/VerifyPhoneNumber';
import PasswordField from 'commons/components/molecules/form-fields/Password';
import { useCreateAccountMutation } from 'commons/redux/apis/party/UserApi';

type PropsType = {
  setTab: (tab: 'login' | 'create-account' | 'reset-password') => void;
}

const CreateAccountTab: FC<PropsType> = ({
  setTab,
}) => {
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

  const handleCreateAccount = () => {
    const { phoneNumber, password, firstName, lastName } = data;
    if (!phoneNumber || !password || !firstName || !lastName) {
      toast.error('همه‌ی موارد خواسته شده را پر کن');
      return;
    }
    createAccount(data);
  };

  return (
    <Stack
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          handleCreateAccount();
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
        label={"شماره تلفن همراه"}
        verificationType='create-user-account'
      />

      <PasswordField
        onTabChange={setTab}
        onChange={collectData}
      />

      <Button
        onClick={handleCreateAccount}
        variant="contained"
        color="primary"
        disabled={isLoading}
        fullWidth>
        ثبت
      </Button>

      <Typography align="center" pt={1}>
        {'حساب کاربری دارید؟'}
        <Link
          component="button"
          underline="none"
          sx={{
            marginLeft: 0.5,
            fontWeight: 800,
            color: '#1361A4',
          }}
          onClick={() => setTab('login')}
        >
          {'ورود'}
        </Link>
      </Typography>

    </Stack>
  )
}

export default CreateAccountTab;