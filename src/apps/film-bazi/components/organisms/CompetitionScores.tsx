import React from "react";
import { Box, Grid } from "@mui/material";
import WinnerCard from "../molecules/WinnerCard";
import ScoreRecord from "../molecules/ScoreRecord";

export default function CompetitionScores({ winners, allScores }){
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
}