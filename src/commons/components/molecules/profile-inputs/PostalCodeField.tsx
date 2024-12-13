import TextField, { TextFieldProps } from '@mui/material/TextField';
import React, { useEffect, useState } from "react";


interface PostalCodeInputProps extends Omit<TextFieldProps, 'value'> {
  value?: string;
  onValidationChange: (isValid: boolean) => void;
  isRequired: boolean;
  displayEmptyErrorMessage: boolean;
}


const PostalCodeField: React.FC<PostalCodeInputProps> = ({ onChange, value = '', label, onValidationChange, isRequired, displayEmptyErrorMessage }) => {

  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('');

  useEffect(() => {
    if(displayEmptyErrorMessage){
      setError(true);
      setHelperText('این فیلد نمی‌تواند خالی باشد.');
    }
    else{
      setError(false);
      setHelperText("");
    }
  }, [displayEmptyErrorMessage]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (/^[\d\u06F0-\u06F9\u0660-\u0669]*$/.test(inputValue)) {
      if (inputValue.length < 10 && inputValue.length > 0) {
        setError(true);
        setHelperText('کد پستی باید ۱۰ رقمی باشد.')
        onValidationChange(false)
      }
      else {
        setError(false);
        setHelperText('');
        onValidationChange(true);
      }
    } 
    else {
      setError(true);
      setHelperText('فقط ارقام مجاز است.');
      onValidationChange(false);
    }

    onChange?.(e);
  };

  const handleBlur = () => {
    if (isRequired && !value?.trim()) {
      setError(true);
      setHelperText('این فیلد نمی‌تواند خالی باشد.');
    }
  };

  return (
    <TextField
      fullWidth
      required={isRequired}
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