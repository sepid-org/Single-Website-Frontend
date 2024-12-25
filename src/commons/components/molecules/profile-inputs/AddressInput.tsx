import TextField, { TextFieldProps } from '@mui/material/TextField';
import React, { useEffect, useState } from "react";

interface AddressFieldProps extends Omit<TextFieldProps, 'value'> {
  value?: string;
  isRequired: boolean;
  onValidationChange: (isValid: boolean) => void;
  displayEmptyErrorMessage: boolean;
}

const AddressField: React.FC<AddressFieldProps> = ({ 
  onChange, 
  value='', 
  label, 
  isRequired, 
  onValidationChange, 
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

  const handleBlur = () => {
    if (isRequired && !value?.trim()) {
      setError(true);
      setHelperText('این فیلد نمی‌تواند خالی باشد.');
      onValidationChange(false);
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
      placeholder={placeholder}
      label={label}
      onBlur={handleBlur}
      error={error}
      helperText={helperText}
    />
  );
}

export default AddressField;