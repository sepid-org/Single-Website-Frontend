import { Box, Button, Container, Dialog, Grid, IconButton, Paper, Stack, Typography } from "@mui/material";
import React, { FC, Fragment, useState } from "react";
import archive from "../../assets/archive.svg";
import closeButtonIcon from "../../assets/close-circle.svg";
import evidence from "../../assets/evidence.svg";
import unaccessibleEvidence from "../../assets/unaccessibleEvidence.svg";
import AccessibleDocument from "../molecules/AccessibleDocument";
import UnaccessibleDocument from "../molecules/UnaccessibleDocument";
import Back from "../molecules/buttons/Back";
import useLocalNavigate from "apps/ashbaria/hooks/useLocalNavigate";
import { useParams } from "react-router-dom";
import { DocumentType } from "apps/ashbaria/types";

type DocumentsPropsType = {
	documents: DocumentType[];
}

const Documents: FC<DocumentsPropsType> = ({
	documents,
}) => {
	const { fsmId } = useParams();
	const localNavigate = useLocalNavigate();

	const backToCourt = () => {
		localNavigate(`/court/${fsmId}/`);
	}

	return (
		<Container component={Paper} maxWidth='lg'>
			<Stack padding={2}>
				<Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
					<Back />
					<Stack direction={'row'} spacing={0.5}>
						<Box
							component="img"
							src={archive}
							width="28px"
							height="28px"
						/>
						<Typography variant="h6">
							{'بایگانی اسناد'}
						</Typography>
					</Stack>
					<IconButton onClick={backToCourt}>
						<Box
							component="img"
							src={closeButtonIcon}
							width="28px"
							height="28px"
						/>
					</IconButton>
				</Stack>
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
							return (<AccessibleDocument />)
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
							src={unaccessibleEvidence}
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
								<UnaccessibleDocument />
							);
						})}
					</Grid>
				</Box>
			</Stack>
		</Container>
	);
}

export default Documents;