/*import { Box, Container, Typography } from "@mui/material";
import starIcon from "./Vector 1.svg";
import React from "react";

export default function ScoreBoard(){

    return(
        <Container
            sx = {{
                backgroundColor: "#17132D",
                width: "100vw",
                height: "100vh",

            }}
        >
            <ScoreRecord name={"فاطمه احمدزاده"} score={"۱۲"}/>
        </Container>
    );
}

function ScoreRecord({name, score}){
    return(
        <Container
            sx = {{
                height: "Hug (60px)px",
                padding: "16px",
                gap: "12px",
                borderRadius: "32px",
                background: "linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(153, 153, 153, 0.02) 100%)",
                display: "flex",
                flexDirection: "row",
            }}
        >
            <Container
            >
                <Box 
                    component="img"
                    src={starIcon}
                />
                <Typography>{score}</Typography>
            </Container>
            <Container>
                <Typography>{name}</Typography>
            </Container>
        </Container>
    );
}*/



import React from 'react';
import goldenStarIcon from "./Vector 1.svg";
import starIcon from "./Vector.svg";
import {
    Box,
    Typography,
    Paper,
    Grid,
    CircularProgress
} from '@mui/material';
      
      
interface Winner {
    name: string;
    score: string;
    rank: number;
}
      
interface ScoreRecord {
    rank: number;
    name: string;
    score: string;
}
      
interface CompetitionScoresProps {
    winners: Winner[];
    allScores: ScoreRecord[];
}
      
const CompetitionScores: React.FC<CompetitionScoresProps> = ({ winners, allScores }) => {
    return (
        <Box
            sx={{
                backgroundColor: '#17132D',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 3,
            }}
        >
            <Box 
                sx={{ 
                    textAlign: 'center', 
                    marginBottom: 4 
                }}
            >
                <Grid container spacing={2}>
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
      
const WinnerCard: React.FC<Winner> = ({ name, score, rank }) => {
    const conditionalHeight = rank === 1 ? "198px" : rank === 2 ? "120px" : "58px";
    return (
        <Paper 
            sx={{ 
                padding: 2,  
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                backgroundColor: "transparent" 
            }}
        >
            <Box 
                sx={{ 
                    width: "60.52px",
                    height: "60.52px",
                    gap: "0px",
                    border: "1.5px", 
                    borderRadius: '50%', 
                    //conditional background color 
                    backgroundColor: '#FFA95A', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    marginBottom: 2,
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
                    //conditional color 
                    color: "white"
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
                    //conditional color
                    color: "white"
                }}
            >
                {score}
            </Typography>
            <Box 
                sx={{ 
                    width: "135.67px",
                    //conditional height
                    height: conditionalHeight,
                    borderRadius: "10px 10px 0px 0px",
                    //conditional background color
                    backgroundColor: "gold"
                }} 
            />
        </Paper>
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
                {rank}
            </Typography>
        </Box>
          <Paper 
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
                    {score}
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
          </Paper>
          </Box>
        );
      };
      
      // Example Usage
      const App: React.FC = () => {
        const winners = [
          { name: 'فاطمه', score: "100" , rank: 1},
          { name: 'احمد', score: "90", rank: 2 },
          { name: 'زهرا', score: "80" , rank:3},
        ];
      
        const allScores = [
          { rank: 1, name: 'فاطمه', score: "۱۰۰" },
          { rank: 2, name: 'احمد', score: "۹۰" },
          { rank: 3, name: 'زهرا', score: "۸۰" },
          { rank: 4, name: 'علی', score: "۷۰" },
          { rank: 5, name: 'قلی', score: "۶۰" },
        ];
      
        return (
          <CompetitionScores winners={winners} allScores={allScores} />
        );
      };
      
      export default App;
      