import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Iran from "commons/utils/iran";
import React from "react";
import { TextFieldProps } from '@mui/material/TextField';

type CitySelectorProps = TextFieldProps & {
	data: any;
	setData: any;
}

const CitySelector: React.FC<CitySelectorProps> = ({ data, setData, label }) => {
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
				disabled={!data?.province && !data?.city}
				value={data?.city || ''}
				onChange={(event) => { setData({ ...data, city: event.target.value }) }}
			>
				{Iran.Cities.filter((city) =>
					city.province_id == Iran.Provinces.find(province => province.title == data?.province)?.id)
					.map((city) => (
						<MenuItem key={city.id} value={city.title}>
							{city.title}
						</MenuItem>
					))}
			</Select>
		</FormControl>
	);
}

export default CitySelector;