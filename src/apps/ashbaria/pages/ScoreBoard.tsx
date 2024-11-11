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
					width: '30%',
					position: "fixed",
					left: 0,
					bottom: 0,
					zIndex: 0,
				}}
			/>
			<Container maxWidth='sm' component={Paper} sx={{ zIndex: 1 }}>
				<Scores />
			</Container>
			<Box
				component="img"
				src={rightImg}
				sx={{
					width: '30%',
					position: "fixed",
					right: 0,
					bottom: 0,
					zIndex: 0,
				}}
			/>
		</FullScreenBackgroundImage>
	);
};

export default ScoreBoard;