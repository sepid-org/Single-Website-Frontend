import TextField, { TextFieldProps } from '@mui/material/TextField';
import React from "react";

interface PostalCodeInputProps{
  handleChange: any;
  postal_code: string;
  label?: string;
}

const PostalCodeField: React.FC<TextFieldProps> = ({ onChange, value, label }) => {
  return (
    <TextField
      fullWidth
      required
      value={value || ''}
      name="postal_code"
      onChange={onChange}
      placeholder="کد پستی خود را وارد کنید."
      inputProps={{
        maxLength: 10,
        inputMode: "numeric",
      }}
      label={label}
    />
  );
}

export default PostalCodeField;