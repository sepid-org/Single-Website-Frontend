import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import { TextFieldProps } from '@mui/material/TextField';
import Iran from "commons/utils/iran";
import React, { useState } from "react";

type ProvinceSelectorProps = TextFieldProps & {
	data: any;
	setData: any;
	isRequired: boolean;
	onValidationChange: (isValid: boolean) => void;
}

const ProvinceSelector: React.FC<ProvinceSelectorProps> = ({ data, setData, label, isRequired, onValidationChange }) => {
	
	const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('');
	
	const handleBlur = () => {
    if (isRequired && !data?.province?.trim()) {
      setError(true);
      setHelperText('این فیلد نمی‌تواند خالی باشد.');
    }
  };

  const handleInputChange = (e) => {
    setError(false);
    setHelperText('');
    onValidationChange(true);
    setData({ ...data, province: e.target.value })
  }

	return (
		<FormControl
			required={isRequired}
			onBlur={handleBlur}
			fullWidth
		>
			{label &&
				<InputLabel>
					{label}
				</InputLabel>
			}
			<Select
				label={label ? label : null}
				error={error}
				value={data?.province || ''}
				onChange={(event) => handleInputChange(event)}
			>
				{Iran.Provinces.map((province) => (
					<MenuItem key={province.id} value={province.title}>
						{province.title}
					</MenuItem>
				))}
			</Select>
			<FormHelperText sx={{color: "#d32f2f"}}>{helperText}</FormHelperText>
		</FormControl>
	);
}

export default ProvinceSelector;