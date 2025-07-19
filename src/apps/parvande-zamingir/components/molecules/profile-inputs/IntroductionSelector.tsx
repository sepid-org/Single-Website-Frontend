import { FormControl, FormHelperText, MenuItem, Select, Typography } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";

export default function ({ handleChange, referral_method, isRequired, onValidationChange, displayEmptyErrorMessage }) {
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
		if (isRequired && !referral_method?.trim()) {
			setError(true);
			setHelperText('این فیلد نمی‌تواند خالی باشد.');
      onValidationChange(false)
		}
	};

	const handleInputChange = (e) => {
		setError(false);
		setHelperText('');
		onValidationChange(true);
		handleChange?.(e);
	}
  return (
    <Fragment>
      <Typography
        sx={{
          marginBottom: '4px',
          fontSize: 14,
          fonWeight: 400,
        }}
      >
        نحوه‌ی آشنایی
      </Typography>
      <FormControl
        required={isRequired}
        onBlur={handleBlur}
        fullWidth
      >
        <Select
          name="referral_method"
          value={referral_method || ''}
          onChange={(event) => handleInputChange(event)}
          error={error}
        >
          <MenuItem value="دوستان">دوستان</MenuItem>
          <MenuItem value="مدرسه">مدرسه</MenuItem>
          <MenuItem value="تبلیغات تلوزیونی">تبلیغات تلوزیونی</MenuItem>
          <MenuItem value="پیامک">پیامک</MenuItem>
          <MenuItem value="سایر">سایر</MenuItem>
        </Select>
      </FormControl>
			<FormHelperText sx={{color: "#d32f2f"}}>{helperText}</FormHelperText>
    </Fragment>
  );
}