import TextField, { TextFieldProps } from '@mui/material/TextField';
import React, { useState } from "react";

interface AddressFieldProps extends Omit<TextFieldProps, 'value'> {
  value?: string;
  isRequired: boolean;
  onValidationChange: (isValid: boolean) => void;
}

const AddressField: React.FC<AddressFieldProps> = ({ onChange, value='', label, isRequired, onValidationChange }) => {
  
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('');

  const handleBlur = () => {
    if (isRequired && !value?.trim()) {
      setError(true);
      setHelperText('این فیلد نمی‌تواند خالی باشد.');
    }
  };

  const handleInputChange = (e) => {
    setError(false);
    setHelperText('');
    onValidationChange(true);
    onChange?.(e);
  }

  return (
    <TextField
      fullWidth
      required={isRequired}
      multiline
      minRows={2}
      value={value || ''}
      name="address"
      onChange={handleInputChange}
      placeholder="آدرس خود را وارد کنید."
      label={label}
      onBlur={handleBlur}
      error={error}
      helperText={helperText}
    />
  );
}

export default AddressField;