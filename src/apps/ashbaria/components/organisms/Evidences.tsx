import { Box, Button, Container, Dialog, Grid, IconButton, Paper, Typography } from "@mui/material";
import React, { Fragment, useState } from "react";
import archive from "../../assets/archive.svg";
import closeButtonIcon from "../../assets/close-circle.svg";
import evidence from "../../assets/evidence.svg";
import unaccessableEvidence from "../../assets/unaccessableEvidence.svg";
import AccessableEvidence from "../molecules/AccessableEvidence";
import UnaccessableEvidence from "../molecules/UnaccessableEvidence";
import BackButton from "../atoms/BackButton";


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
				<BackButton />
				<Box
					sx={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "center"
					}}
				>
					<Box
						component="img"
						src={archive}
						width="28px"
						height="28px"
					/>
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
					<Box
						component="img"
						src={closeButtonIcon}
						width="28px"
						height="28px"
					/>
				</IconButton>
			</Box>
			<Box
				sx={{
					minWidth: "100%",
					height: "auto",
					padding: "10px",
					display: "flex",
					flexDirection: "column",
				}}
			>
				<Box sx={{ display: "flex", flexDirection: "row", marginBottom: "10px" }}>
					<Box
						component="img"
						src={evidence}
						width="28px"
						height="28px"
					/>
					<Typography
						sx={{
							minWidth: "100%",
							fontSize: "16px",
							fontWeight: 700,
							lineHeight: "25.59px",
						}}
						style={{
							direction: "rtl",
							textAlign: "right"
						}}
					>
						اسناد پرونده‌ی چپق‌فروشان ۱
					</Typography>
				</Box>
				<Grid container sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "12px" }}>
					{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => {
						return (<AccessableEvidence />)
					})}
				</Grid>
			</Box>
			<Box
				sx={{
					minWidth: "100%",
					height: "auto",
					padding: "10px",
					display: "flex",
					flexDirection: "column",
				}}
			>
				<Box sx={{ display: "flex", flexDirection: "row", marginBottom: "10px" }}>
					<Box
						component="img"
						src={unaccessableEvidence}
						width="28px"
						height="28px"
					/>
					<Typography
						sx={{
							minWidth: "100%",
							fontSize: "16px",
							fontWeight: 700,
							lineHeight: "25.59px",
							color: "#A198BB",
						}}
						style={{
							direction: "rtl",
							textAlign: "right"
						}}
					>
						اسناد پرونده‌ی چپق‌فروشان
					</Typography>
				</Box>
				<Grid container sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "12px" }}>
					{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => {
						return (
							<UnaccessableEvidence />
						);
					})}
				</Grid>
			</Box>
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