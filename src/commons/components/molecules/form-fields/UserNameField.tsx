import { TextField } from "@mui/material";
import React from "react";

const UserNameField = ({
	onChange,
	username,
	label='',
	placeHolder='',
}) => {
	return (
		<TextField
			autoComplete="on"
			variant="outlined"
			fullWidth
			onChange={onChange}
			value={username}
			name="username"
			label={label}
			placeholder={placeHolder}
			inputProps={{ className: 'ltr-input' }}
			type='text'
			inputMode='text'
		/>
	);
}

export default UserNameField;