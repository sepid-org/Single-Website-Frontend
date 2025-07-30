import React, { useState } from 'react';
import {
  TextField,
  TextFieldProps,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

type PasswordFieldProps = TextFieldProps & {
  label?: string;
};

const PasswordField: React.FC<PasswordFieldProps> = ({
  onChange,
  label = 'گذرواژه',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
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
      {...props}
    />
  );
};

export default PasswordField;