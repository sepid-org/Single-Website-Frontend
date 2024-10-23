import { Box, Button, Container, Grid, IconButton, Paper, Typography } from "@mui/material";
import React, { Fragment, useState } from "react";
import bg from "../../assets/evidenceBG.svg";
import archive from "../../assets/archive.svg";
import closeButtonIcon from "../../assets/close-circle.svg";
import evidence from "../../assets/evidence.svg";
import unaccessableEvidence from "../../assets/unaccessableEvidence.svg";
import lockIcon from "../../assets/lock.svg";


const Evidences = () => {

	const [visibility, setVisibility] = useState("visibile");

	return (
		<Fragment>
			<Container
				sx={{
					backgroundImage: `url(${bg})`,
					backgroundPosition: "center",
					backgroundAttachment: "fixed",
					backgroundRepeat: "no-repeat",
					backgroundSize: "cover",
					minWidth: "100vw",
					minHeight: "100vh",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Paper
					sx={{
						minWidth: "90%",
						minHeight: "90%",
						display: "flex",
						flexDirection: "column",
						visibility: visibility,
					}}
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
						<IconButton
							sx={{ color: "#FE9C42", fontSize: "40px" }}
							onClick={() => { }}
						>
							→
						</IconButton>
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
							sx={{marginRight: "15px"}}
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
								return (
									<Grid
										item
										xs={2}
										sx={{
											display: "flex",
											justifyContent: "center",
											height: "148px",
											minWidth: "80px",
										}}
									>
										<Box
											sx={{
												width: "100%",
												minHeight: "100%",
												maxWidth: "124px",
												padding: "12px 4px 12px 4px",
												gap: "4px",
												borderRadius: "12px",
												display: "flex",
												flexDirection: "column",
												justifyContent: "center",
												alignItems: "center",
												boxShadow: "0px 2px 6px 0px #0000001A",
												backgroundColor: "#00000066"
											}}
										>
											<Box
												component="img"
												src={evidence}
												width="69px"
												height="69px"
											/>
											<Typography
												sx={{
													color: "#FFA800",
													fontSize: "16px",
													fontWeight: 400,
													lineHeight: "23.86px",
													textAlign: "center",
												}}
											>
												مکالمات چپق‌فروشان
											</Typography>
										</Box>
									</Grid>
								);
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
									<Grid
										item
										xs={2}
										sx={{
											display: "flex",
											justifyContent: "center",
											height: "148px",
											minWidth: "80px",
										}}
									>
										<Box
											sx={{
												width: "100%",
												minHeight: "100%",
												maxWidth: "124px",
												padding: "12px 4px 12px 4px",
												gap: "4px",
												borderRadius: "12px",
												display: "flex",
												flexDirection: "column",
												justifyContent: "center",
												alignItems: "center",
												boxShadow: "0px 2px 6px 0px #0000001A",
												backgroundColor: "#00000066"
											}}
										>
											<Box
												component="img"
												src={lockIcon}
												width="69px"
												height="69px"
											/>
											<Typography
												sx={{
													color: "#60557E",
													fontSize: "16px",
													fontWeight: 400,
													lineHeight: "23.86px",
													textAlign: "center",
												}}
											>
												مکالمات چپق‌فروشان
											</Typography>
										</Box>
									</Grid>
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
				</Paper>
			</Container>
		</Fragment>
	);
}

export default Evidences;