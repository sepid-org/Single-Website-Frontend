import { Box, Grid, Typography } from "@mui/material";
import React, { Fragment, useState } from "react";
import girlSelectedIcon from "../../../assets/girl-yellow-head.svg";
import girlUnselectedIcon from "../../../assets/girl-purple-head.svg"
import boyUnselectedIcon from "../../../assets/boy-purple-head.svg";

export default function GenderSelector({ gender, handleChange }) {
	const [selectedGender, setSelectedGender] = useState(gender);
	const selectColor = (genderValue: string) => {
		return selectedGender === genderValue ? "#FFA800" : "#60557E";
	}
	const selectBackgroundColor = (genderValue: string) => {
		return selectedGender === genderValue ? "#FFC66F33" : "#00000080";
	}
	return (
		<Fragment>
			<Typography
				sx={{
					marginBottom: '4px',
          fontSize: 14,
          fonWeight: 400,
				}}
			>
				جنسیت
			</Typography>
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
						setSelectedGender("M");
						handleChange("M");
					}}
					sx={{
						width: "50%",
						height: 56,
						gap: 1,
						borderRadius: "12px 0px 0px 12px",
						border: "1px solid",
						borderColor: selectColor("M"),
						backgroundColor: selectBackgroundColor("M"),
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Box
						component="img"
						src={boyUnselectedIcon}
						width={20}
						height={20}
					/>
					<Typography sx={{ color: selectColor("M") }}>پسر</Typography>
				</Box>
				<Box
					onClick={() => {
						setSelectedGender("F");
						handleChange("F");
					}}
					sx={{
						width: "50%",
						height: 56,
						gap: 1,
						borderRadius: "0px 12px 12px 0px",
						border: "1px solid",
						borderColor: selectColor("F"),
						backgroundColor: selectBackgroundColor("F"),
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Box
						component="img"
						src={selectedGender === "F" ? girlSelectedIcon : girlUnselectedIcon}
						width={20}
						height={20}
					/>
					<Typography sx={{ color: selectColor("F") }}>دختر</Typography>
				</Box>
			</Box>
		</Fragment>
	);
}