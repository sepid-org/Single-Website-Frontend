import React from 'react';
import Scores from '../components/organisms/Scores';
import { Box, Container, Paper } from '@mui/material';
import backgroundImg from "../assets/profileBackground.svg";
import FullScreenBackgroundImage from '../components/molecules/FullScreenBackgroundImage';
import leftImg from "../assets/scoreboardLeft.svg";
import rightImg from "../assets/scoreboardRight.svg";

const ScoreBoard: React.FC = () => {

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