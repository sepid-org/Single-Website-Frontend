import React, { Fragment, useState } from 'react';
import goldenStarIcon from "../assets/filledStarIcon.svg";
import backgroundImg from "../assets/background.png";
import starIcon from "../assets/starIcon.svg";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { toPersianNumber } from 'commons/utils/translateNumber';
import {
	Box,
	Typography,
	Grid,
	Container,
	Pagination,
	PaginationItem
} from '@mui/material';
import AppBarComponent from '../components/organisms/Appbar';

interface ScoreRecord {
	rank: number;
	name: string;
	score: number;
}

interface WinnerScore{
	rank: number,
	score: number
}


const App: React.FC = () => {
	const allScores = [
		{ name: 'فاطمه', score: 100 },
		{ name: 'احمد', score: 90 },
		{ name: 'زهرا', score: 80 },
		{ name: 'علی', score: 70 },
		{ name: 'قلی', score: 60 },
		{ name: 'فاطمه', score: 70 },
		{ name: 'احمد', score: 100 },
		{ name: 'زهرا', score: 70 },
		{ name: 'علی', score: 90 },
		{ name: 'قلی', score: 60 },
		{ name: 'فاطمه', score: 70 },
		{ name: 'احمد', score: 70 },
		{ name: 'زهرا', score: 70 },
		{ name: 'علی', score: 70 },
		{ name: 'قلی', score: 100 },
		{ name: 'فاطمه', score: 70 },
		{ name: 'احمد', score: 70 },
		{ name: 'زهرا', score: 70 },
		{ name: 'علی', score: 70 },
		{ name: 'قلی', score: 60 },
		{ name: 'فاطمه', score: 70 },
		{ name: 'احمد', score: 70 },
		{ name: 'زهرا', score: 70 },
		{ name: 'علی', score: 90 },
		{ name: 'قلی', score: 60 },
	];
	for(let i = 0; i < allScores.length; i++){
		for(let j = i; j < allScores.length; j++){
			if(allScores[i].score < allScores[j].score){
				let temp = allScores[i];
				allScores[i] = allScores[j];
				allScores[j] = temp;
			}
		}
	}
	let currentScore = allScores[0].score;
	let currentRank = 1;
	let winners: WinnerScore[] = [{rank: currentRank, score: currentScore}];
	for(let i = 0; i < allScores.length; i++){
		if(allScores[i].score === currentScore){
			Object.defineProperty(allScores[i], "rank", {value: currentRank})
		}
		else{
			Object.defineProperty(allScores[i], "rank", {value: currentRank + 1});
			currentRank += 1;
			currentScore = allScores[i].score;
			if(currentRank < 4){
				winners.push({rank: currentRank, score: currentScore});
			}
		}
	}
	

	return (
		<Fragment>
			<AppBarComponent />	
			<CompetitionScores winners={winners} allScores={allScores} />
		</Fragment>
	);
};

export default App;


function CompetitionScores({ winners, allScores }){
    const [scorePage, setScorePage] = useState(1);
	const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
		setScorePage(value);
	};
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
            }}
        >
            
            <Box 
                sx={{ 
                    textAlign: 'center',
					marginTop: "40px"
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
					marginBottom: "10px"
                }}
                container
            >
                {allScores.map(record => (
                    <ScoreRecord key={record.rank} rank={record.rank} name={record.name} score={record.score} />
                ))}
            </Grid>
			{/*<Pagination
				sx={{
					display: "flex",
					flexDirection: "row-reverse"
				}}
				count={Math.ceil(allScores.length / 5)}
				onChange={handleChange}
				siblingCount={2}
				boundaryCount={2}
				variant='outlined'
				renderItem={(item) => (
					<PaginationItem
					  slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
					  {...item}
					/>
				)}
			/>*/}
        </Box>
    );
};
      
const WinnerCard: React.FC<ScoreRecord> = ({ name, score, rank }) => {
    const conditionalHeight = rank === 1 ? "198px" : rank === 2 ? "120px" : "58px";
    const conditionalMargin = rank === 1 ? "0px" : rank === 2 ? "78px" : "140px"; 
    const conditionalColor = rank === 1? "#d9c66a" : rank === 2 ? "#686868" : "#853414";
    const conditionalRectaangleColor = rank === 1 ? "linear-gradient(360deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 205, 32, 0.3) 100%)" : rank === 2 ? "linear-gradient(360deg, rgba(255, 255, 255, 0.03) 0%, rgba(185, 230, 30, 0.3) 100%)" : "linear-gradient(360deg, rgba(255, 255, 255, 0.03) 0%, rgba(235, 92, 36, 0.3) 100%);";

    return (
        <Container 
            sx={{  
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                width: "30%"
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
                        xs: "100px"
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
const conditionalColor = rank === 1? "#d9c66a" : rank === 2 ? "#686868" : rank === 3? "#853414" : "#99999905";
    return (
        <Grid 
            item
            xs={12} 
            sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: "center",
                marginBottom: 1, 
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
                        background: "linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(153, 153, 153, 0.02) 100%)",
                   		backgroundColor: conditionalColor
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
                        {toPersianNumber(rank)}
                    </Typography>
                </Grid>
                <Grid
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
                    item
                    xs={6}
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
                            color: "white",
                            marginLeft: "10px"
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