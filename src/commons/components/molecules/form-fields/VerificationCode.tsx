import {
  TextField,
} from '@mui/material';
import React, { FC } from 'react';
import isNumber from 'commons/utils/validators/isNumber';

type PropsType = {
  onChange: any;
}

const VerificationCodeField: FC<PropsType> = ({
  onChange,
}) => {

  return (
    <TextField
      variant="outlined"
      fullWidth
      onChange={(event) => {
        if (isNumber(event.target.value)) {
          onChange(event)
        }
      }}
      name="verificationCode"
      label="کد تایید پیامک‌شده"
      inputProps={{ dir: 'ltr' }}
      autoComplete='false'
      type='number'
      inputMode='numeric'
    />
  );
};

export default VerificationCodeField;
