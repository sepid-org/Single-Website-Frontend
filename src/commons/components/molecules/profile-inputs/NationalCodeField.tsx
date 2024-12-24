import React, { useEffect, useState } from "react";
import TextField, { TextFieldProps } from '@mui/material/TextField';

interface NationalCodeInputProps extends Omit<TextFieldProps, 'value'> {
  value?: string;
  onValidationChange: (isValid: boolean) => void;
  isRequired: boolean;
  displayEmptyErrorMessage: boolean;
}

const NationalCodeField: React.FC<NationalCodeInputProps> = ({ 
  onChange, 
  value = '', 
  label, 
  onValidationChange, 
  isRequired, 
  displayEmptyErrorMessage,
  placeholder
}) => {
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

    // Check if the input contains non-alphabetic characters
    if (/^[\d\u06F0-\u06F9\u0660-\u0669]*$/.test(inputValue)) {
      if (inputValue.length < 10 && inputValue.length > 0) {
        setError(true);
        setHelperText('کد ملی باید ۱۰ رقمی باشد.')
        onValidationChange(false)
      }
      else {
        setError(false);
        setHelperText('');
        onValidationChange(true);
      }
    } else {
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
      name="national_code"
      onChange={handleInputChange}
      onBlur={handleBlur}
      placeholder={placeholder}
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