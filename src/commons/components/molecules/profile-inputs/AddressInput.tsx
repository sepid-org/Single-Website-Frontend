import TextField, { TextFieldProps } from '@mui/material/TextField';
import React, { useState } from "react";

interface AddressFieldProps extends Omit<TextFieldProps, 'value'> {
  value?: string;
}

const AddressField: React.FC<AddressFieldProps> = ({ onChange, value='', label }) => {
  
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('');

  const handleBlur = () => {
    if (!value?.trim()) {
      setError(true);
      setHelperText('این فیلد نمی‌تواند خالی باشد.');
    }
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setError(false);
    setHelperText('');
    onChange?.(e);
  }

  return (
    <TextField
      fullWidth
      required
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