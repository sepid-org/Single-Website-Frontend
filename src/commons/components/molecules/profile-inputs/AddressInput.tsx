import TextField, { TextFieldProps } from '@mui/material/TextField';
import React from "react";

interface AddressInputProps {
  handleChange: any;
  address: string;
  label?: string;
}

const AddressField: React.FC<TextFieldProps> = ({ onChange, value, label }) => {
  return (
    <TextField
      fullWidth
      required
      multiline
      minRows={2}
      value={value || ''}
      name="address"
      onChange={onChange}
      placeholder="آدرس خود را وارد کنید."
      label={label}
    />
  );
}

export default AddressField;