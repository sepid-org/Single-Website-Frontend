import React, { useState } from 'react';
import {
  Link,
  TextField,
  TextFieldProps,
  IconButton,
  InputAdornment,
  Typography
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

type PasswordFieldProps = TextFieldProps & {
  resetPasswordLink?: string;
  onTabChange?: (tab: 'login' | 'create-account' | 'reset-password') => void;
  label?: string;
};

const PasswordField: React.FC<PasswordFieldProps> = ({
  onChange,
  label = 'گذرواژه',
  onTabChange,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleForgot = () => {
    onTabChange?.('reset-password');
  };

  return (
    <TextField
      variant="outlined"
      fullWidth
      onChange={onChange}
      label={label}
      name="password"
      type={showPassword ? 'text' : 'password'}
      inputProps={{
        dir: 'ltr',
        ...props.inputProps,
      }}
      InputProps={{
        ...props.InputProps,
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={togglePasswordVisibility} edge="end">
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      helperText={
        <Typography component="span">
          <Link
            component="button"
            underline="none"
            sx={{ fontWeight: 600 }}
            onClick={handleForgot}
          >
            {'رمز عبور را فراموش کرده‌ام'}
          </Link>
        </Typography>
      }
      {...props}
    />
  );
};

export default PasswordField;