import React from "react";
import { Box, Container, Grid, Skeleton } from "@mui/material";
import WinnerCard from "../molecules/WinnerCard";
import ScoreRecord from "../molecules/ScoreRecord";
import { all } from "axios";
import ScoreRecordSkeleton from "../molecules/ScoreRecodsSkeleton";
import WinnerCardsSkeleton from "../molecules/WinnerCardsSkleton";

export default function CompetitionScores({ allScores, winnerScores }){
     /*const [scorePage, setScorePage] = useState(1);
	const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
		setScorePage(value);
	};*/

    return (
        <Box
            sx={{
                height: "auto",
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
                    {winnerScores.length > 0 ? 
                        (<>
                            <Grid>
                                <WinnerCard score={winnerScores[2]?.score} rank={winnerScores[2]?.rank} />
                            </Grid>
                            <Grid>
                                <WinnerCard score={winnerScores[0]?.score} rank={winnerScores[0]?.rank} />
                            </Grid>
                            <Grid>
                                <WinnerCard score={winnerScores[1]?.score} rank={winnerScores[1]?.rank} />
                            </Grid>
                        </>) :
                        (<>
                            <WinnerCardsSkeleton />
                        </>)
                    }
                    
                </Grid>
            </Box>
            <Grid 
                sx={{ 
                    display: "flex",
                    justifyContent: "center",
                    width: '100%',
					marginBottom: "10px"
                }}
                container
            >
                {allScores.winnerUsersInfo.length > 0 ?
                allScores.winnerUsersInfo.map(record => (
                    <ScoreRecord key={record.id} rank={record.rank} first_name={record.first_name} last_name={record.last_name} score={record.score} currentUser={record.currentUser} id={record.id}/>
                )) :
                <ScoreRecordSkeleton />
                }
                {(allScores.currentUser!= null && !allScores.currentUserExistsInWinners) && 
                    <>
                        <Box sx={{marginTop: "50px", marginBottom: "50px"}}>
                            <Box sx={{backgroundColor: "white", borderRadius:"50%", width:"10px", height:"10px", margin: "2px"}} />
                            <Box sx={{backgroundColor: "white", borderRadius:"50%", width:"10px", height:"10px", margin: "2px"}} />
                            <Box sx={{backgroundColor: "white", borderRadius:"50%", width:"10px", height:"10px", margin: "2px"}} />
                        </Box>
                        <ScoreRecord key={allScores.currentUser.id} rank={allScores.currentUser.rank} first_name={allScores.currentUser.first_name} last_name={allScores.currentUser.last_name} score={allScores.currentUser.score} currentUser={allScores.currentUser.currentUser} id={allScores.currentUser.id}/>
                    </>
                }
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
}