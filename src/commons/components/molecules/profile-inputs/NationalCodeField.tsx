import React from "react";
import TextField, { TextFieldProps } from '@mui/material/TextField';

interface NationalCodeInputProps {
  handleChange: any;
  national_code: string;
  label?: string;

} 

const NationalCodeField: React.FC<TextFieldProps> = ({ value, label, onChange }) => {
  return (
    <TextField
      fullWidth
      required
      value={value || ''}
      name="national_code"
      onChange={onChange}
      placeholder="کد ملی خود را وارد کنید."
      inputProps={{
        maxLength: 10,
        inputMode: "numeric",
      }}
      label={label}
    />
  );
}

export default NationalCodeField;