import React, { useState } from "react";
import TextField, { TextFieldProps } from '@mui/material/TextField';

interface LastNameFieldProps extends Omit<TextFieldProps, 'value'> {
  value?: string;
  onValidationChange: (isValid: boolean) => void;
}

const LastNameField: React.FC<LastNameFieldProps> = ({ onChange, value = '', label, onValidationChange }) => {
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (/^[a-zA-Z\u0600-\u06FF\s]*$/.test(inputValue)) {
      setError(false);
      setHelperText('');
      onValidationChange(false);
    } else {
      setError(true);
      setHelperText('فقط حروف الفبایی مجاز است.');
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
      name="last_name"
      onChange={handleInputChange}
      onBlur={handleBlur}
      placeholder="نام خانوادگی خود را وارد کنید."
      label={label}
      error={error}
      helperText={helperText}
    />
  );
};

export default LastNameField;