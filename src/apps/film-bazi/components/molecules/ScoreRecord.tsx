import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import { toPersianNumber } from 'commons/utils/translateNumber';
import goldenStarIcon from "../../assets/filledStarIcon.svg";
import { ScoreBoardItemType } from "commons/types/bank";

const ScoreRecord: React.FC<ScoreBoardItemType> = ({ rank, first_name, last_name, score, currentUser }) => {
	const conditionalUserBackground = currentUser ? "linear-gradient(180deg, #BBD043 0%, #BBD043 100%)" : "linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(153, 153, 153, 0.02) 100%)";
	const textColor = currentUser ? "black" : "white";
	return (
		<Grid
			item
			xs={12}
			sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: "center",
				marginBottom: 2,
			}}
		>
			<Grid
				container
				sx={{
					display: "flex",
					justifyContent: "center"
				}}
			>
				<Grid
					sx={{
						marginRight: "12px",
						minWidth: "60px",
						width: "60px",
						height: "60px",
						position: 'relative',
						borderRadius: "100px",
						background: conditionalUserBackground,
					}}
					item
				>
					<Typography
						variant="body1"
						sx={{
							position: 'absolute',
							left: '50%',
							top: '50%',
							transform: 'translate(-50%, -50%)',
							color: 'white',
							fontWeight: 'bold',
						}}
					>
						{toPersianNumber(rank) || '-'}
					</Typography>
				</Grid>
				<Grid
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						borderRadius: "32px",
						height: "60px",
						width: "619px",
						padding: "16px",
						gap: "12px",
						background: conditionalUserBackground,
					}}
					item
					xs={9}
					md={6}
				>
					<Typography
						variant="body1"
						sx={{
							flexGrow: 1,
							paddingLeft: 1,
							fontSize: "18px",
							fontWeight: "400",
							lineHeight: "27px",
							letterSpacing: "0.02em",
							color: textColor,
							marginLeft: "10px",
						}}
					>
						{first_name + " " + last_name}
					</Typography>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center'
						}}
					>
						<Typography
							sx={{
								fontSize: "18px",
								fontWeight: "400",
								lineHeight: "27px",
								letterSpacing: "0.02em",
								color: textColor,
								marginRight: "8px"
							}}
							variant="body1"
						>
							{toPersianNumber(score)}
						</Typography>
						<Box
							component="img"
							src={goldenStarIcon}
							sx={{
								width: "28px",
								height: "28px",
								marginRight: "10px"
							}}
						/>
					</Box>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default ScoreRecord;