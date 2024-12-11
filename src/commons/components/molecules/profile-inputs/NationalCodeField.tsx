import React, { useState } from "react";
import TextField, { TextFieldProps } from '@mui/material/TextField';

interface NationalCodeInputProps extends Omit<TextFieldProps, 'value'> {
  value?: string;
  onValidationChange: (isValid: boolean) => void;
}

const NationalCodeField: React.FC<NationalCodeInputProps> = ({ onChange, value = '', label, onValidationChange }) => {
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    // Check if the input contains non-alphabetic characters
    if (/^[\d\u06F0-\u06F9\u0660-\u0669]*$/.test(inputValue)) {
      setError(false);
      setHelperText('');
      onValidationChange(false);
    } else {
      setError(true);
      setHelperText('فقط ارقام مجاز است.');
      onValidationChange(true);
    }

    onChange?.(e);
  };

  const handleBlur = () => {
    if (!value?.trim()) {
      setError(true);
      setHelperText('این فیلد نمی‌تواند خالی باشد.');
    }
  };

  
  return (
    <TextField
      fullWidth
      required
      value={value}
      name="national_code"
      onChange={handleInputChange}
      onBlur={handleBlur}
      placeholder="کد ملی خود را وارد کنید."
      inputProps={{
        maxLength: 10,
        inputMode: "numeric",
      }}
      label={label}
      error={error}
      helperText={helperText}
    />
  );
}

export default NationalCodeField;