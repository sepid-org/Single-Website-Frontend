import React, { Fragment } from "react";
import { Box, Container, Grid, IconButton, Stack, Typography } from "@mui/material";
import WinnerCard from "../molecules/WinnerCard";
import ScoreRecord from "../molecules/ScoreRecord";
import ScoreRecordSkeleton from "../molecules/ScoreRecordsSkeleton";
import WinnerCardsSkeleton from "../molecules/WinnerCardsSkeleton";
import BackButton from "../molecules/buttons/Back";
import SearchIcon from "../atoms/icons/Search";
import CupIcon from "../atoms/icons/Cup";
import rankings from "../../assets/rankings.svg";

export default function CompetitionScores({ allScores, winnerScores }) {

	return (
		<Stack justifyContent={'center'} paddingY={2}>
			<Grid
				sx={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
					marginTop: 1,
				}}
			>
				<BackButton />
				<Box sx={{ display: "flex", flexDirection: "row", }}>
					<CupIcon />
					<Typography
						fontWeight={800}
						fontSize={18}
					>
						{"شاخ‌ترین‌ها"}
					</Typography>
				</Box>
				<IconButton>
					<SearchIcon />
				</IconButton>
			</Grid>

			<Grid
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center"
				}}
			>
				{winnerScores.length > 0 ?
					<Container
						sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							marginTop: 2
						}}
					>
						<Box
							sx={{
								width: "60%",
								marginBottom: 1,
								position: "relative",
							}}
						>
							<Typography fontWeight={600} fontSize={"11.98px"} sx={{ position: "absolute", top: "20%", left: "10%", }}>
								{winnerScores[1]["score"]}
							</Typography>
							<Typography fontWeight={600} fontSize={"11.98px"} sx={{ position: "absolute", left: "45%", }}>
								{winnerScores[0]["score"]}
							</Typography>
							<Typography fontWeight={600} fontSize={"11.98px"} sx={{ position: "absolute", top: "20%", left: "90%", }}>
								{winnerScores[2]["score"]}
							</Typography>
						</Box>
						<Box
							component="img"
							src={rankings}
							width="60%"
							height="200px"
						/>
					</Container> :
					<WinnerCardsSkeleton />
				}
			</Grid>

			<Stack alignItems={'center'} justifyContent={'center'} spacing={2}>
				{allScores.winnerUsersInfo.length > 0 ?
					allScores.winnerUsersInfo.map(record => (
						<ScoreRecord key={record.id} rank={record.rank} first_name={record.first_name} last_name={record.last_name} score={record.score} currentUser={record.currentUser} id={record.id} profileImg="" />
					)) :
					<ScoreRecordSkeleton />
				}
				{(allScores.currentUser != null && !allScores.currentUserExistsInWinners) &&
					<>
						<Box sx={{ marginTop: 2, marginBottom: 2 }}>
							<Box sx={{ backgroundColor: "white", borderRadius: "50%", width: "10px", height: "10px", margin: "2px" }} />
							<Box sx={{ backgroundColor: "white", borderRadius: "50%", width: "10px", height: "10px", margin: "2px" }} />
							<Box sx={{ backgroundColor: "white", borderRadius: "50%", width: "10px", height: "10px", margin: "2px" }} />
						</Box>
						<ScoreRecord
							key={allScores.currentUser.id}
							rank={allScores.currentUser.rank}
							first_name={allScores.currentUser.first_name}
							last_name={allScores.currentUser.last_name}
							score={allScores.currentUser.score}
							currentUser={allScores.currentUser.currentUser}
							id={allScores.currentUser.id}
							profileImg=""
						/>
					</>
				}
			</Stack>
		</Stack>
	);
}