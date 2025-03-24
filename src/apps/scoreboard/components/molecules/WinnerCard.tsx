import React from "react";
import { Box, Typography, Stack, } from "@mui/material";
import { toPersianNumber } from 'commons/utils/translateNumber';
import StarIcon from "../atoms/StarIcon";

type PropsType = {
	rank: number,
	score: number,
	name: string,
}

const WinnerCard: React.FC<PropsType> = ({ rank, score, name }) => {
	const conditionalHeight = rank === 1 ? 180 : rank === 2 ? 120 : 80;
	const conditionalColor = rank === 1 ? "#d9c66a" : rank === 2 ? "#686868" : "#853414";
	const conditionalRectangleColor = rank === 1 ? "linear-gradient(360deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 205, 32, 0.3) 100%)" : rank === 2 ? "linear-gradient(360deg, rgba(171, 191, 197, 0.08) 0%, rgba(171, 191, 197, 0.8) 100%)" : "linear-gradient(360deg, rgba(255, 255, 255, 0.03) 0%, rgba(235, 92, 36, 0.3) 100%);";

	return (
		<Stack width={'100%'} maxWidth={130} alignItems={'center'} spacing={1}>
			<Stack
				alignItems={'center'}
				justifyContent={'center'}
				borderRadius={'50%'}
				height={60}
				width={60}
				sx={{ backgroundColor: conditionalColor }}
			>
				<StarIcon size={32} />
			</Stack>
			<Typography
				textAlign={'center'}
				fontSize={16}
				fontWeight={600}
				color={conditionalColor}
				overflow={'hidden'}
				whiteSpace={'normal'}
				textOverflow={'ellipsis'}
			>
				{name}
				<br />
				{toPersianNumber(score)}
			</Typography>
			<Box
				width={{ md: 140, xs: 100 }}
				height={conditionalHeight}
				borderRadius={"12px 12px 0px 0px"}
				sx={{
					background: conditionalRectangleColor
				}}
			/>
		</Stack>
	);
}

export default WinnerCard;