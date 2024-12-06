import { Box, Typography } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { ReactComponent as GirlLogo } from "../../../../apps/ashbaria/assets/girl-yellow-head.svg";
import girlUnselectedIcon from "../../../../apps/ashbaria/assets/girl-purple-head.svg";
import boySelectedIcon from "../../../../apps/ashbaria/assets/boy-yellow-head.svg";
import boyUnselectedIcon from "../../../../apps/ashbaria/assets/boy-purple-head.svg";
import { Workshop } from "../../../configs/themes/MuiVariables";

export default function GenderSelector({ gender, handleChange, maleGender = "Male", femaleGender = "Female" }) {
	const [selectedGender, setSelectedGender] = useState(gender);

	useEffect(() => {
		if (gender) {
			setSelectedGender(gender);
		}
	}, [gender])

	const selectColor = (genderValue: string) => {
		return selectedGender === genderValue ? Workshop.colors.secondary : undefined;
	}
	const selectBackgroundColor = (genderValue: string) => {
		return selectedGender === genderValue ? Workshop.colors.primary : undefined;
	}
	return (
		<Fragment>
			<Box
				sx={{
					display: "flex",
					flexDirection: "row",
					width: "100%",
					height: 56
				}}
			>
				<Box
					onClick={() => {
						setSelectedGender(maleGender);
						handleChange(maleGender);
					}}
					sx={{
						width: "50%",
						height: 56,
						gap: 1,
						borderRadius: "8px 0px 0px 8px",
						border: "1px solid",
						borderColor: selectColor(maleGender),
						//backgroundColor: selectBackgroundColor("M"),
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Box
						component="img"
						src={selectedGender === maleGender ? boySelectedIcon : boyUnselectedIcon}
						width={20}
						height={20}
					/>
					<Typography sx={{ color: selectColor(maleGender) }}>پسر</Typography>
				</Box>
				<Box
					onClick={() => {
						setSelectedGender(femaleGender);
						handleChange(femaleGender);
					}}
					sx={{
						width: "50%",
						height: 56,
						gap: 1,
						borderRadius: "0px 8px 8px 0px",
						border: "1px solid",
						borderColor: selectColor(femaleGender),
						//backgroundColor: selectBackgroundColor("F"),
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<GirlLogo
							fill="green"
					/>
					<Typography sx={{ color: selectColor(femaleGender) }}>دختر</Typography>
				</Box>
			</Box>
		</Fragment>
	);
}