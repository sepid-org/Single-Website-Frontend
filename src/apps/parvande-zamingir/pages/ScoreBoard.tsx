import React from 'react';
import Scores from '../components/organisms/Scores';
import { Box, Paper } from '@mui/material';
import FullScreenBackgroundImage from 'commons/components/molecules/FullScreenBackgroundImage';
import { MediaUrls } from '../constants/mediaUrls';

const ScoreBoard: React.FC = () => {

	return (
		<FullScreenBackgroundImage image={MediaUrls.LOGIN_PAGE_BACKGROUND}>
			<Box width={'100%'} maxWidth='sm' component={Paper} sx={{ zIndex: 1 }}>
				<Scores />
			</Box>
		</FullScreenBackgroundImage>
	);
};

export default ScoreBoard;