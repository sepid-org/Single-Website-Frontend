import React, { Fragment } from 'react';
import goldenStarIcon from "../assets/filledStarIcon.svg";
import backgroundImg from "../assets/background.png";
import starIcon from "../assets/starIcon.svg";
import { toPersianNumber } from 'commons/utils/translateNumber';
import {
	Box,
	Typography,
	Grid,
	Container
} from '@mui/material';
import AppBarComponent from '../components/organisms/Appbar';
import useGetScoreBoard from '../hooks/useGetScoreBoard';
import { ScoreBoardItemType } from '../types';

interface CompetitionScoresProps {
	winners: ScoreBoardItemType[];
	allScores: ScoreBoardItemType[];
}

const CompetitionScores: React.FC<CompetitionScoresProps> = ({ winners, allScores }) => {
	return (
		<Box
			sx={{
				width: '100%',
				backgroundImage: `url(${backgroundImg})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
				minHeight: '100vh',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center'
			}}
		>

			<Box
				sx={{
					textAlign: 'center',
				}}
			>
				<Grid width={'100%'} container spacing={2}>
					<Grid item xs={4}>
						< WinnerCard name={winners[2]?.name} score={winners[2]?.score} rank={winners[2]?.rank} />
					</Grid>
					<Grid item xs={4}>
						<WinnerCard name={winners[0]?.name} score={winners[0]?.score} rank={winners[0]?.rank} />
					</Grid>
					<Grid item xs={4}>
						<WinnerCard name={winners[1]?.name} score={winners[1]?.score} rank={winners[1]?.rank} />
					</Grid>
				</Grid>
			</Box>
			<Box sx={{ width: '100%', maxWidth: 600 }}>
				{allScores.map(record => (
					<ScoreRecord key={record.rank} rank={record.rank} name={record.name} score={record.score} />
				))}
			</Box>
		</Box>
	);
};

const WinnerCard: React.FC<ScoreBoardItemType> = ({ name, score, rank }) => {
	const conditionalHeight = rank === 1 ? "198px" : rank === 2 ? "120px" : "58px";
	const conditionalMargin = rank === 1 ? "0px" : rank === 2 ? "78px" : "140px";
	const conditionalColor = rank === 1 ? "#d9c66a" : rank === 2 ? "#686868" : "#853414";
	const conditionalRectangleColor = rank === 1 ? "linear-gradient(360deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 205, 32, 0.3) 100%)" : rank === 2 ? "linear-gradient(360deg, rgba(255, 255, 255, 0.03) 0%, rgba(185, 230, 30, 0.3) 100%)" : "linear-gradient(360deg, rgba(255, 255, 255, 0.03) 0%, rgba(235, 92, 36, 0.3) 100%);";

	return (
		<Container
			sx={{
				padding: 2,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center'
			}}
		>
			<Box
				sx={{
					width: "60.52px",
					height: "60.52px",
					gap: "0px",
					border: "1.5px",
					borderRadius: '50%',
					backgroundColor: conditionalColor,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					marginBottom: 2,
					marginTop: conditionalMargin,
				}}
			>
				<Box
					component="img"
					src={starIcon}
					sx={{
						width: "35.4px",
						height: "34.26px",
						top: "12.56px",
						left: "50.13px",
						border: "1.5px",
					}}
				/>
			</Box>
			<Typography
				sx={{
					fontSize: "16px",
					fontWeight: "400",
					lineHeight: "24px",
					letterSpacing: "0.02em",
					textAlign: "right",
					color: conditionalColor
				}}
			>
				{name}
			</Typography>
			<Typography
				sx={{
					marginBottom: 2,
					fontSize: "16px",
					fontWeight: "600",
					lineHeight: "24px",
					textAlign: "center",
					color: conditionalColor
				}}
			>
				{toPersianNumber(score)}
			</Typography>
			<Box
				sx={{
					width: "135.67px",
					height: conditionalHeight,
					borderRadius: "10px 10px 0px 0px",
					background: conditionalRectangleColor

				}}
			/>
		</Container>
	);
};

const ScoreRecord: React.FC<ScoreBoardItemType> = ({ rank, name, score }) => {
	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				marginBottom: 1,
			}}
		>
			<Box
				sx={{
					marginRight: "12px",
					minWidth: "60px",
					width: "60px",
					height: "60px",
					position: 'relative',
					borderRadius: "100px",
					background: "linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(153, 153, 153, 0.02) 100%)",
				}}
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
					{toPersianNumber(rank)}
				</Typography>
			</Box>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					marginBottom: 1,
					borderRadius: "32px",
					height: "60px",
					width: "619px",
					padding: "16px",
					gap: "12px",
					background: "linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(153, 153, 153, 0.02) 100%)",
				}}
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
						color: "white"
					}}
				>
					{name}
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
							color: "white",
							marginRight: "5px"
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
							height: "28px"
						}}
					/>
				</Box>
			</Box>
		</Box>
	);
};


const App: React.FC = () => {
	const { scoreBoard } = useGetScoreBoard();

	const winners = [
		{ name: 'فاطمه', score: 100, rank: 1 },
		{ name: 'احمد', score: 90, rank: 2 },
		{ name: 'زهرا', score: 80, rank: 3 },
	];

	const allScores = [
		{ rank: 1, name: 'فاطمه', score: 100 },
		{ rank: 2, name: 'احمد', score: 90 },
		{ rank: 3, name: 'زهرا', score: 80 },
		{ rank: 4, name: 'علی', score: 70 },
		{ rank: 5, name: 'قلی', score: 60 },
	];

	return (
		<Fragment>
			<AppBarComponent />
			<Container maxWidth={false}
				sx={{
					display: 'flex',
					paddingBottom: 2,
					justifyContent: 'center',
					marginRight: 'auto !important',
					marginLeft: 'auto !important',
				}}>
				<CompetitionScores winners={winners} allScores={allScores} />
			</Container>
		</Fragment>
	);
};

export default App;