import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { TextFieldProps } from '@mui/material/TextField';
import Iran from "commons/utils/iran";
import React from "react";

type ProvinceSelectorProps = TextFieldProps & {
	data: any;
	setData: any;
}

const ProvinceSelector: React.FC<ProvinceSelectorProps> = ({ data, setData, label }) => {
	return (
		<FormControl
			required
			fullWidth
		>
			{label &&
				<InputLabel>
					{label}
				</InputLabel>
			}
			<Select
				label={label ? label : null}
				value={data?.province || ''}
				onChange={(event) => { setData({ ...data, province: event.target.value }) }}
			>
				{Iran.Provinces.map((province) => (
					<MenuItem key={province.id} value={province.title}>
						{province.title}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
}

export default ProvinceSelector;