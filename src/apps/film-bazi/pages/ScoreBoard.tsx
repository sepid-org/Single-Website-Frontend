import React, { useState } from 'react';
import goldenStarIcon from "../assets/filledStarIcon.svg";
import backgroundImg from "../assets/background.png";
import starIcon from "../assets/starIcon.svg";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { toPersianNumber } from 'commons/utils/translateNumber';
import {
    Box,
    Typography,
    Paper,
    Grid,
    Container,
    Button
} from '@mui/material';
import AppBarComponent from '../components/organisms/Appbar';

interface ScoreRecord {
	rank: number;
	name: string;
	score: number;
}

interface CompetitionScoresProps {
	winners: ScoreRecord[];
	allScores: ScoreRecord[];
}

const CompetitionScores: React.FC<CompetitionScoresProps> = ({ winners, allScores }) => {
    const [scorePage, setScorePage] = useState(1);
    return (
        <Box
            sx={{
                backgroundImage: `url(${backgroundImg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundAttachment: "fixed",
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            
            <Box 
                sx={{ 
                    textAlign: 'center'
                }}
            >
                <Grid  
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <Grid>
                        < WinnerCard name={winners[2]?.name} score={winners[2]?.score} rank={winners[2]?.rank} />
                    </Grid>
                    <Grid>
                        <WinnerCard name={winners[0]?.name} score={winners[0]?.score} rank={winners[0]?.rank} />
                    </Grid>
                    <Grid>
                        <WinnerCard name={winners[1]?.name} score={winners[1]?.score} rank={winners[1]?.rank} />
                    </Grid>
                </Grid>
            </Box>
            <Grid 
                sx={{ 
                    width: '100%',
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
					flexDirection: "column"
                }}
                container
            >
                {allScores.slice((scorePage - 1) * 5, Math.min(scorePage * 5, allScores.length)).map(record => (
                    <ScoreRecord key={record.rank} rank={record.rank} name={record.name} score={record.score} />
                ))}
            </Grid>
			<Grid
				sx={{
					display: "flex",
					flexDirection: "row",
					marginTop: "5px"
				}}
				padding={2}
			>
				{scorePage < (Math.ceil(allScores.length / 5)) &&
				<Button 
					onClick={() => setScorePage(scorePage + 1)}
				>
					<ArrowForwardIosIcon />
					صفحه‌ی بعد
				</Button>
				}
				{scorePage > 1 && 
				<Button 
					onClick={() => setScorePage(scorePage - 1)}
				>
					صفحه‌ی قبل
					<ArrowBackIosIcon />	
				</Button>
				}
			</Grid>
        </Box>
    );
};

const WinnerCard: React.FC<ScoreRecord> = ({ name, score, rank }) => {
	const conditionalHeight = rank === 1 ? "198px" : rank === 2 ? "120px" : "58px";
	const conditionalMargin = rank === 1 ? "0px" : rank === 2 ? "78px" : "140px";
	const conditionalColor = rank === 1 ? "#d9c66a" : rank === 2 ? "#686868" : "#853414";
	const conditionalRectaangleColor = rank === 1 ? "linear-gradient(360deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 205, 32, 0.3) 100%)" : rank === 2 ? "linear-gradient(360deg, rgba(255, 255, 255, 0.03) 0%, rgba(185, 230, 30, 0.3) 100%)" : "linear-gradient(360deg, rgba(255, 255, 255, 0.03) 0%, rgba(235, 92, 36, 0.3) 100%);";

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
					width:{
						md: "135.67px",
						xs: "110px"
					},
					height: conditionalHeight,
					borderRadius: "10px 10px 0px 0px",
					background: conditionalRectaangleColor

				}}
			/>
		</Container>
	);
};

const ScoreRecord: React.FC<ScoreRecord> = ({ rank, name, score }) => {
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
					width: {
						md:"619px",
						xs: "400px"
					},
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
    const winners = [
        { name: 'فاطمه', score: 100 , rank: 1},
        { name: 'احمد', score: 90, rank: 2 },
        { name: 'زهرا', score: 80 , rank:3},
    ];
      
    const allScores = [
        { rank: 1, name: 'فاطمه', score: 100 },
          { rank: 2, name: 'احمد', score: 90 },
          { rank: 3, name: 'زهرا', score: 80 },
          { rank: 4, name: 'علی', score: 70 },
          { rank: 5, name: 'قلی', score: 60 },
          { rank: 6, name: 'فاطمه', score: 70 },
          { rank: 7, name: 'احمد', score: 70 },
          { rank: 8, name: 'زهرا', score: 70 },
          { rank: 9, name: 'علی', score: 70 },
          { rank: 10, name: 'قلی', score: 60 },
          { rank: 11, name: 'فاطمه', score: 70 },
          { rank: 12, name: 'احمد', score: 70 },
          { rank: 13, name: 'زهرا', score: 70 },
          { rank: 14, name: 'علی', score: 70 },
          { rank: 15, name: 'قلی', score: 60 },
          { rank: 16, name: 'فاطمه', score: 70 },
          { rank: 17, name: 'احمد', score: 70 },
          { rank: 18, name: 'زهرا', score: 70 },
          { rank: 19, name: 'علی', score: 70 },
          { rank: 20, name: 'قلی', score: 60 },
    ];
      
    return (
        <CompetitionScores winners={winners} allScores={allScores} />
    );
};

export default App;