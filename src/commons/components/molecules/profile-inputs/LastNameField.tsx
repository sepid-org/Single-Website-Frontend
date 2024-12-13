import React, { useEffect, useState } from "react";
import TextField, { TextFieldProps } from '@mui/material/TextField';

interface LastNameFieldProps extends Omit<TextFieldProps, 'value'> {
  value?: string;
  onValidationChange: (isValid: boolean) => void;
  isRequired: boolean;
  displayEmptyErrorMessage: boolean;
}

const LastNameField: React.FC<LastNameFieldProps> = ({ onChange, value = '', label, onValidationChange, isRequired, displayEmptyErrorMessage }) => {
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
    } else {
      setError(true);
      setHelperText('فقط حروف الفبایی مجاز است.');
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