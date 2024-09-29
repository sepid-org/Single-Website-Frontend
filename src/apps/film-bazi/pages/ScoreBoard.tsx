import React, { Fragment, useEffect, useState } from 'react';
import goldenStarIcon from "../assets/filledStarIcon.svg";
import backgroundImg from "../assets/background.png";
import starIcon from "../assets/starIcon.svg";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { toPersianNumber } from 'commons/utils/translateNumber';
import useGetScoreBoard from '../hooks/useGetScoreBoard';
import {
	Box,
	Typography,
	Grid,
	Container,
	Pagination,
	PaginationItem
} from '@mui/material';
import AppBarComponent from '../components/organisms/Appbar';
import useGetMyRank from '../hooks/useGetMyRank';
import { from } from 'stylis';
import { useSelector } from 'react-redux';

interface ScoreRecord {
	rank: number;
	first_name: string;
	last_name: string;
	score: number;
	currentUser: boolean;
}

interface WinnerScore{
	rank: number,
	score: number
}


const App: React.FC = () => {
	let { scoreBoard, loading: scoreBoardLoading } = useGetScoreBoard();
	const {rank: myRank, loading: myRankLoading, error: myRankError} = useGetMyRank();
	
    const [winners, setWinners] = useState([]);
	const [scoreRecords, setScoreRecords] = useState([]);

	const userAccount = useSelector((state: any) => state.account);

	useEffect(() => {
		if (!scoreBoardLoading) {
		  const calculateWinners = () => {
			const ranks = [];
			for(let i = 1; i < 4; i++){
				let rank = scoreBoard.find(record => record.rank === i);
				if(rank != null){
					ranks.push({rank: i, score: rank.score});
				}
			}
			setWinners(ranks);
			for(let i = 0; i < scoreBoard.length; i++){
				Object.defineProperty(scoreBoard[i], "currentUser", {value: false, writable: true});
			}
			setScoreRecords(scoreBoard);
		  };
		  calculateWinners();
		}
	  }, [scoreBoardLoading]);

	useEffect(() => {
		if(!scoreBoardLoading && !myRankLoading && myRank!= null){
			let currentUser = (scoreBoard.find(record => (record.rank === myRank.rank && userAccount.userInfo.first_name === record.first_name && userAccount.userInfo.last_name === record.last_name)));
			if (currentUser != null){
				currentUser.currentUser = true;
				setScoreRecords(scoreBoard);
			}
		}
	}, [scoreBoardLoading, myRankLoading])

	
	

	return (
		<Fragment>
			<AppBarComponent />	
			<CompetitionScores winners={winners} allScores={scoreRecords} />
			{scoreBoard.map((record) => (<p>{record.first_name}</p>))}
		</Fragment>
	);
};

export default App;


function CompetitionScores({ winners, allScores }){
    /*const [scorePage, setScorePage] = useState(1);
	const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
		setScorePage(value);
	};*/
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
                        < WinnerCard score={winners[2]?.score} rank={winners[2]?.rank} />
                    </Grid>
                    <Grid>
                        <WinnerCard score={winners[0]?.score} rank={winners[0]?.rank} />
                    </Grid>
                    <Grid>
                        <WinnerCard score={winners[1]?.score} rank={winners[1]?.rank} />
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
                    <ScoreRecord key={record.rank} rank={record.rank} first_name={record.first_name} last_name={record.last_name} score={record.score} currentUser={record.currentUser}/>
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
      
const WinnerCard: React.FC<WinnerScore> = ({ score, rank }) => {
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
      
const ScoreRecord: React.FC<ScoreRecord> = ({ rank, first_name, last_name, score, currentUser }) => {
	const conditionalUsreBackground = currentUser? "#2bb013": "#99999905";
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
						backgroundColor: conditionalUsreBackground,
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