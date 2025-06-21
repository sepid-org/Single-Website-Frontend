import React, { useState } from 'react';
import {
  TextField,
  TextFieldProps,
  IconButton,
  InputAdornment,
  Typography
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link } from 'react-router-dom';

type PasswordFieldProps = TextFieldProps & {
  resetPasswordLink?: string;
  label?: string;
};

const PasswordField: React.FC<PasswordFieldProps> = ({
  onChange,
  label = 'گذرواژه',
  resetPasswordLink = '',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <TextField
      variant="outlined"
      fullWidth
      onChange={onChange}
      label={label}
      name="password"
      inputProps={{
        dir: 'ltr',
        ...props.inputProps
      }}
      type={showPassword ? "text" : "password"}
      InputProps={{
        ...props.InputProps,
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={togglePasswordVisibility} edge="end">
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        )
      }}
      helperText={
        resetPasswordLink && (
          <Typography component="span">
            <Link style={{ textDecoration: 'none' }} to={resetPasswordLink}>
              {'رمز عبور را فراموش کرده‌ام'}
            </Link>
          </Typography>
        )
      }
      {...props}
    />
  );
}

export default PasswordField;