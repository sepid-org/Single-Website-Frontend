import { Box, Button, Dialog, Grid, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import Back from "../molecules/buttons/Back";
import ArchiveIcon from "../atoms/icons/Archive";
import CloseIcon from "../atoms/icons/Close";
import CourtEvidences from "./CourtEvidences";


const Evidences = () => {

	const [visibility, setVisibility] = useState("visibile");

	return (
		<Dialog
			sx={{
				minWidth: "90%",
				minHeight: "90%",
				display: "flex",
				flexDirection: "column",
				visibility: visibility,
			}}
			open
		>
			<Box
				sx={{
					minWidth: "100%",
					height: "auto",
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					margin: "10px",
				}}
			>
				<Back />
				<Box
					sx={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "center"
					}}
				>
					<ArchiveIcon />
					<Typography
						variant="h6"
						sx={{ fontSize: "18px", fontWeight: 800, color: "white" }}
					>
						بایگانی اسناد
					</Typography>
				</Box>
				<IconButton
					onClick={() => { setVisibility("hidden") }}
					sx={{ marginRight: "15px" }}
				>
					<CloseIcon />
				</IconButton>
			</Box>
			<CourtEvidences courtName={"اسناد پرونده‌ی چپق‌فروشان ۱"} documents={[1,2,3,4,5,6,7,8]} accessable={true} />
			<CourtEvidences courtName={"اسناد پرونده‌ی چپق‌فروشان ۱"} documents={[1,2,3,4,5,6,7,8,9,10]} accessable={false} />
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "44px",
					width: "148px",
					margin: "15px",
					borderRadius: "100px",
					backgroundClip: "padding-box",
					position: "relative",
					overflow: "hidden",
					background: "linear-gradient(to right, #FE9C42, #E25100)",
				}}
			>
				<Button
					fullWidth
					sx={{
						height: "42px",
						width: "146px",
						padding: "10px 20px 10px 20px",
						gap: "4px",
						borderRadius: "100px",
						backgroundColor: "#130e15",
						backgroundClip: "padding-box",
						color: "#FE9C42",
						'&: hover': {
							background: "linear-gradient(180deg, #FE9C42, #E25100)",
							color: "black"
						}
					}}
					onClick={() => { }}
				>
					بازگشت به دادگاه
				</Button>
			</Box>
		</Dialog>
	);
}

export default Evidences;