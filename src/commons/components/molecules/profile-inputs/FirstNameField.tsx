import TextField, { TextFieldProps } from '@mui/material/TextField';
import React, { useEffect, useState } from "react";

interface FirstNameFieldProps extends Omit<TextFieldProps, 'value'> {
  value?: string;
  onValidationChange: (isValid: boolean) => void;
  isRequired: boolean;
  displayEmptyErrorMessage: boolean;
}

const FirstNameField: React.FC<FirstNameFieldProps> = ({ 
  onChange, 
  value = '', 
  label, 
  onValidationChange, 
  isRequired, 
  displayEmptyErrorMessage,
  placeholder,
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

    if (/^[a-zA-Z\u0600-\u06FF\s]*$/.test(inputValue)) {
      setError(false);
      setHelperText('');
      onValidationChange(true);
    } 
    else{
      setError(true);
      setHelperText('فقط حروف الفبایی مجاز است.');
      onValidationChange(false);
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
      placeholder={placeholder}
      label={label}
      error={error}
      helperText={helperText}
    />
  );
}

export default FirstNameField;