import React from 'react';
import Scores from '../components/organisms/Scores';
import { Box, Container, createTheme, Paper, ThemeProvider } from '@mui/material';
import backgroundImg from "../assets/image6.svg";
import FullScreenBackgroundImage from '../components/molecules/FullScreenBackgroundImage';
import leftImg from "../assets/scoreboardLeft.svg";
import rightImg from "../assets/scoreboardRight.svg";

const ScoreBoard: React.FC = () => {

	const theme = createTheme({
		breakpoints: {
			values: {
				xs: 0,
				sm: 600,
				md: 900,
				lg: 1200,
				xl: 1400,
			},
		},
	});

	return (
		<FullScreenBackgroundImage image={backgroundImg}>
			<Box
				component="img"
				src={leftImg}
				sx={{
					position: "fixed",
					left: 0,
					bottom: 0,
					display: {
						xs: "none",
						xl: "block",
					}
				}}
			/>
			<Container maxWidth='md' component={Paper}>
				<Scores />
			</Container>
			<Box
				component="img"
				src={rightImg}
				sx={{
					position: "fixed",
					right: 0,
					bottom: 0,
					display: {
						xs: "none",
						xl: "block",
					}
				}}
			/>
		</FullScreenBackgroundImage>
	);
};

export default ScoreBoard;