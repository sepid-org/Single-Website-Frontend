import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import Iran from "commons/utils/iran";
import React, { useState } from "react";
import { TextFieldProps } from '@mui/material/TextField';

type CitySelectorProps = TextFieldProps & {
	data: any;
	setData: any;
	isRequired: boolean;
	onValidationChange: (isValid: boolean) => void;
	label?: string;
}

const CitySelector: React.FC<CitySelectorProps> = ({ data, setData, label, isRequired, onValidationChange }) => {
	const [error, setError] = useState(false);
	const [helperText, setHelperText] = useState('');

	const handleBlur = () => {
		if (isRequired && !data?.city?.trim()) {
			setError(true);
			setHelperText('این فیلد نمی‌تواند خالی باشد.');
			onValidationChange(false);
		}
	};

	const handleInputChange = (e) => {
		setError(false);
		setHelperText('');
		onValidationChange(true);
		setData({ ...data, city: e.target.value })
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
				disabled={!data?.province && !data?.city}
				error={error}
				value={data?.city || ''}
				onChange={(event) => handleInputChange(event)}
			>
				{Iran.Cities.filter((city) =>
					city.province_id == Iran.Provinces.find(province => province.title == data?.province)?.id)
					.map((city) => (
						<MenuItem key={city.id} value={city.title}>
							{city.title}
						</MenuItem>
					))}
			</Select>
			<FormHelperText sx={{color: "#d32f2f"}}>{helperText}</FormHelperText>
		</FormControl>
	);
}

export default CitySelector;