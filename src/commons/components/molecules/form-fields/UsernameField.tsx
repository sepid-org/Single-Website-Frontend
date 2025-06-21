import React from "react";
import { TextField, TextFieldProps } from "@mui/material";

type UsernameFieldProps = TextFieldProps & {
	username?: string;
	placeHolder?: string;
};

const UsernameField: React.FC<UsernameFieldProps> = ({
	onChange,
	username = '',
	label = '',
	placeHolder = '',
	variant = 'outlined',
	...props
}) => {
	return (
		<TextField
			autoComplete="on"
			fullWidth
			onChange={onChange}
			value={username}
			name="username"
			label={label}
			placeholder={placeHolder}
			variant={variant}
			inputProps={{
				dir: 'ltr',
				...props.inputProps
			}}
			type='text'
			inputMode='text'
			{...props}
		/>
	);
}

export default UsernameField;