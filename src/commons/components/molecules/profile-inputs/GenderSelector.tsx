import { Box, Typography } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import {ReactComponent as BoyHeadIcon} from "../../atoms/icons/boy-purple-head.svg";
import {ReactComponent as GirlHeadIcon} from "../../atoms/icons/girl-purple-head.svg";

export default function GenderSelector({ gender, handleChange, maleGender = "Male", femaleGender = "Female", primaryColor, secondareyColor=undefined }) {
	const [selectedGender, setSelectedGender] = useState(gender);

	useEffect(() => {
		if (gender) {
			setSelectedGender(gender);
		}
	}, [gender])

	const selectColor = (genderValue: string) => {
		return selectedGender === genderValue ? primaryColor : undefined;
	}
	const selectBackgroundColor = (genderValue: string) => {
		return selectedGender === genderValue ? primaryColor : undefined;
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
					<BoyHeadIcon style={{color: selectColor(maleGender)}} />
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
					<GirlHeadIcon style={{color: selectColor(femaleGender)}} />
					<Typography sx={{ color: selectColor(femaleGender) }}>دختر</Typography>
				</Box>
			</Box>
		</Fragment>
	);
}