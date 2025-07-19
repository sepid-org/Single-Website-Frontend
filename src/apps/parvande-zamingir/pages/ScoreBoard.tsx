import React from 'react';
import Scores from '../components/organisms/Scores';
import { Box, Paper } from '@mui/material';
import FullScreenBackgroundImage from '../../../commons/components/molecules/FullScreenBackgroundImage';
import { MediaUrls } from '../constants/mediaUrls';

const ScoreBoard: React.FC = () => {

	return (
		<FullScreenBackgroundImage image={MediaUrls.WALL}>
			<Box
				component="img"
				src={MediaUrls.SCOREBOARD_LEFT}
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
				src={MediaUrls.SCOREBOARD_RIGHT}
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