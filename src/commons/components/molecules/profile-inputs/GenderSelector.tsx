import { Box, Typography, useTheme } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { ReactComponent as BoyHeadIcon } from "../../atoms/icons/boy-purple-head.svg";
import { ReactComponent as GirlHeadIcon } from "../../atoms/icons/girl-purple-head.svg";

export default function GenderSelector({
	gender,
	handleChange,
	maleGender = "Male",
	femaleGender = "Female",
	handleValidationChange,
	displayEmptyErrorMessage,
	primaryColor = null,
	secondaryColor = null,
	primaryBGColor = null,
	secondaryBGColor = null,
}) {
	const [selectedGender, setSelectedGender] = useState(gender);
	const theme = useTheme();

	useEffect(() => {
		if (gender) {
			setSelectedGender(gender);
			handleValidationChange(true);
		}
	}, [gender]);

	const selectColor = (genderValue: string) =>
		selectedGender === genderValue
			? primaryColor || theme.palette.primary.contrastText
			: secondaryColor || theme.palette.text.secondary;

	const selectBackgroundColor = (genderValue: string) => {
		return selectedGender === genderValue
			? primaryBGColor || theme.palette.primary.main
			: secondaryBGColor || "transparent";
	};

	const selectBorderColor = (genderValue: string) => {
		if (!gender && displayEmptyErrorMessage) return theme.palette.error.main;
		return selectedGender === genderValue
			? primaryColor || theme.palette.primary.main
			: theme.palette.divider;
	};

	return (
		<Fragment>
			<Box
				sx={{
					display: "flex",
					flexDirection: "row",
					width: "100%",
					height: 56,
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
						backgroundColor: selectBackgroundColor(maleGender),
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<BoyHeadIcon style={{ color: selectColor(maleGender) }} />
					<Typography
						sx={{
							color: selectColor(maleGender),
							userSelect: "none",
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
						backgroundColor: selectBackgroundColor(femaleGender),
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<GirlHeadIcon style={{ color: selectColor(femaleGender) }} />
					<Typography
						sx={{
							color: selectColor(femaleGender),
							userSelect: "none",
						}}
					>
						دختر
					</Typography>
				</Box>
			</Box>
			<Typography
				fontSize={12}
				sx={{
					color: theme.palette.error.main,
					marginTop: "3px",
				}}
			>
				{!gender && displayEmptyErrorMessage ? "این فیلد نمی‌تواند خالی باشد." : ""}
			</Typography>
		</Fragment>
	);
}