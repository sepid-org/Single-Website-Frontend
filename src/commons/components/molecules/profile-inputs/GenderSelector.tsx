import { Box, Typography } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { ReactComponent as BoyHeadIcon } from "../../atoms/icons/boy-purple-head.svg";
import { ReactComponent as GirlHeadIcon } from "../../atoms/icons/girl-purple-head.svg";

export default function GenderSelector({
	gender,
	handleChange,
	maleGender = "Male",
	femaleGender = "Female",
	primaryColor,
	secondareyColor = undefined,
	changeBGColor = false,
	primaryBGColor = undefined,
	secondareyBGColor = undefined,
	handleValidationChange
}) {
	const [selectedGender, setSelectedGender] = useState(gender);

	useEffect(() => {
		if (gender) {
			setSelectedGender(gender);
			handleValidationChange(true);
		}
	}, [gender])

	const selectColor = (genderValue: string) => {
		return selectedGender === genderValue ? primaryColor : (secondareyColor ? secondareyColor : "gray");
	}
	const selectBackgroundColor = (genderValue: string) => {
		return selectedGender === genderValue ? primaryBGColor : secondareyBGColor;
	}

	const selectBorderColor = (genderValue: string) => {
		return selectedGender === genderValue ? primaryColor : (secondareyColor ? secondareyColor : "lightgray");
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
						borderColor: selectBorderColor(maleGender),
						backgroundColor: (changeBGColor ? selectBackgroundColor(maleGender) : null),
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<BoyHeadIcon style={{ color: selectColor(maleGender) }} />
					<Typography
						sx={{
							color: selectColor(maleGender),
							userSelect: "none"
						}}
					>
						پسر
					</Typography>
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
						borderColor: selectBorderColor(femaleGender),
						backgroundColor: (changeBGColor ? selectBackgroundColor(femaleGender) : null),
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<GirlHeadIcon style={{ color: selectColor(femaleGender) }} />
					<Typography
						sx={{
							color: selectColor(femaleGender),
							userSelect: "none"
						}}
					>
						دختر
					</Typography>
				</Box>
			</Box>
		</Fragment>
	);
}