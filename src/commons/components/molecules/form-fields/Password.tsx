import React, { useState } from 'react';
import { TextField, IconButton, InputAdornment, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link } from 'react-router-dom';

function PasswordField({ collectData, label = 'گذرواژه', resetPasswordLink='', }) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <TextField
      variant="outlined"
      fullWidth
      onChange={collectData}
      label={label}
      name="password"
      inputProps={{ className: 'ltr-input' }}
      type={showPassword ? "text" : "password"}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={togglePasswordVisibility} edge="end">
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        )
      }}
      helperText={
        resetPasswordLink != '' && 
        <Typography component="span">
          <Link style={{ textDecoration: 'none' }} to={resetPasswordLink}>
            {'رمز عبور را فراموش کرده‌ام'}
          </Link>
        </Typography>
      }
    />
  );
}

export default PasswordField;
