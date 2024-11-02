import React from 'react';
import CompetitionScores from '../components/organisms/CompetitionScores';
import { Container, Paper } from '@mui/material';
import backgroundImg from "../assets/image6.svg";
import FullScreenBackgroundImage from '../components/molecules/FullScreenBackgroundImage';

const ScoreBoard: React.FC = () => {

	return (
		<FullScreenBackgroundImage image={backgroundImg}>
			<Container maxWidth='md' component={Paper}>
				<CompetitionScores/>
			</Container>
		</FullScreenBackgroundImage>
	);
};

export default ScoreBoard;