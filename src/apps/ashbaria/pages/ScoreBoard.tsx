import React from 'react';
import Scores from '../components/organisms/Scores';
import { Container, Paper } from '@mui/material';
import backgroundImg from "../assets/image6.svg";
import FullScreenBackgroundImage from '../components/molecules/FullScreenBackgroundImage';

const ScoreBoard: React.FC = () => {

	return (
		<FullScreenBackgroundImage image={backgroundImg}>
			<Container maxWidth='md' component={Paper}>
				<Scores/>
			</Container>
		</FullScreenBackgroundImage>
	);
};

export default ScoreBoard;