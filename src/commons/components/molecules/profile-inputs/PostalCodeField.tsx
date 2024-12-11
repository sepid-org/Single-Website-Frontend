import TextField, { TextFieldProps } from '@mui/material/TextField';
import React, { useState } from "react";


interface PostalCodeInputProps extends Omit<TextFieldProps, 'value'> {
  value?: string;
  onValidationChange: (isValid: boolean) => void;
}


const PostalCodeField: React.FC<PostalCodeInputProps> = ({ onChange, value = '', label, onValidationChange }) => {

  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    // Check if the input contains non-alphabetic characters
    if (/^[\d\u06F0-\u06F9\u0660-\u0669]*$/.test(inputValue)) {
      if (inputValue.length < 10 && inputValue.length > 0) {
        setError(true);
        setHelperText('کد پستی باید ۱۰ رقمی باشد.')
        onValidationChange(true)
      }
      else {
        setError(false);
        setHelperText('');
        onValidationChange(false);
      }
    } 
    else {
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
      name="postal_code"
      onChange={handleInputChange}
      onBlur={handleBlur}
      error={error}
      helperText={helperText}
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