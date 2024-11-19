import React from 'react';
import Scores from '../components/organisms/Scores';
import { Box, Paper } from '@mui/material';
import FullScreenBackgroundImage from '../components/molecules/FullScreenBackgroundImage';
import { ImageUrls } from '../constants/imageUrls';

const ScoreBoard: React.FC = () => {

	return (
		<FullScreenBackgroundImage image={ImageUrls.WALL}>
			<Box
				component="img"
				src={ImageUrls.SCOREBOARD_LEFT}
				sx={{
					width: '30%',
					position: "fixed",
					left: 0,
					bottom: 0,
					zIndex: 0,
				}}
			/>
			<Box width={'100%'} maxWidth='sm' component={Paper} sx={{ zIndex: 1 }}>
				<Scores />
			</Box>
			<Box
				component="img"
				src={ImageUrls.SCOREBOARD_RIGHT}
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