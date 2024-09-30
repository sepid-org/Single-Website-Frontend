import React from "react";
import { Box, Container, Grid, Skeleton } from "@mui/material";
import WinnerCard from "../molecules/WinnerCard";
import ScoreRecord from "../molecules/ScoreRecord";

export default function CompetitionScores({ winners, allScores, currentUser }){
     /*const [scorePage, setScorePage] = useState(1);
	const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
		setScorePage(value);
	};*/
    const currentUserExists = allScores.find(record => {record.rank === currentUser.rank && record.first_name === currentUser.first_name && record.last_name === currentUser.last_name}) != undefined;
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
                    display: "flex",
                    justifyContent: "center",
                    width: '100%',
					marginBottom: "10px"
                }}
                container
            >
                {allScores.map(record => (
                    <ScoreRecord key={record.rank} rank={record.rank} first_name={record.first_name} last_name={record.last_name} score={record.score} currentUser={record.currentUser}/>
                ))}
                {/*!currentUserExists && 
                    <Box sx={{marginTop: "50px"}}>
                        <Box sx={{backgroundColor: "white", borderRadius:"50%", width:"10px", height:"10px", margin: "2px"}} />
                        <Box sx={{backgroundColor: "white", borderRadius:"50%", width:"10px", height:"10px", margin: "2px"}} />
                        <Box sx={{backgroundColor: "white", borderRadius:"50%", width:"10px", height:"10px", margin: "2px"}} />
                    </Box>
                */}
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