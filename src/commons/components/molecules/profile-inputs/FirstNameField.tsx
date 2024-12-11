import TextField, { TextFieldProps } from '@mui/material/TextField';
import React, { useState } from "react";

interface FirstNameFieldProps extends Omit<TextFieldProps, 'value'> {
  value?: string;
  onValidationChange: (isValid: boolean) => void;
  isRequired: boolean;
}

const FirstNameField: React.FC<FirstNameFieldProps> = ({ onChange, value = '', label, onValidationChange, isRequired }) => {
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (/^[a-zA-Z\u0600-\u06FF\s]*$/.test(inputValue)) {
      setError(false);
      setHelperText('');
      onValidationChange(false);
    } 
    else{
      setError(true);
      setHelperText('فقط حروف الفبایی مجاز است.');
      onValidationChange(true);
    }

    onChange?.(e);
  };

  const handleBlur = () => {
    if (isRequired &&!value?.trim()) {
      setError(true);
      setHelperText('این فیلد نمی‌تواند خالی باشد.');
    }
  };
  
  return (
    <TextField
      required={isRequired}
      fullWidth
      value={value || ''}
      name="first_name"
      onChange={handleInputChange}
      onBlur={handleBlur}
      placeholder="نام خود را وارد کنید."
      label={label}
      error={error}
      helperText={helperText}
    />
  );
}

export default FirstNameField;