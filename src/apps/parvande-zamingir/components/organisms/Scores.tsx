import React, { Fragment, useEffect, useRef } from "react";
import { Box, Stack, Typography } from "@mui/material";
import ScoreRecord from "../molecules/ScoreRecord";
import BackButton from "../molecules/buttons/Back";
import CupIcon from "../atoms/icons/Cup";
import { PARVANDE_ZAMINGIR_COIN } from '../../constants/game-info';
import useGetScoreBoardData from "apps/ashbaria/hooks/useGetScoreboardData";
import { toPersianNumber } from "commons/utils/translateNumber";
import hashStringToNumber from "commons/utils/hashStringToNumber";

export default function Scores() {
	const {
		scoreRecordsState,
	} = useGetScoreBoardData(PARVANDE_ZAMINGIR_COIN);

	const getDisplayName = (user_id: string, first_name: string, last_name: string) => {
		if (first_name && last_name) {
			return `${first_name} ${last_name}`;
		}

		const hashCode = hashStringToNumber(user_id);
		return `دادبستان ${toPersianNumber(hashCode.toString().padStart(4, '0'))}`;
	}

	const currentUserScoreRecord = useRef(null);
	useEffect(() => {
		if (currentUserScoreRecord.current) {
			currentUserScoreRecord.current.scrollIntoView({
				behavior: 'smooth',
				block: 'center',
				inline: 'nearest'
			})
		}
	}, [currentUserScoreRecord.current]);

	return (
		<Stack alignItems={'center'} justifyContent={'center'} padding={2} spacing={2} position={'relative'}>
			<Stack direction={'row'}>
				<Box position={'absolute'} left={4} top={4}>
					<BackButton />
				</Box>
				<Stack direction={'row'} spacing={1} alignItems={'center'} justifyContent={'center'}>
					<CupIcon size={32} />
					<Typography fontSize={24} fontWeight={800}>
						{'شاخ‌ترین‌ها'}
					</Typography>
				</Stack>
			</Stack>

			<Fragment>
				{scoreRecordsState.winnerUsersInfo
					.slice(0, 990)
					.map((record, index) => (
						<ScoreRecord
							key={record.user_id}
							rank={index + 11}
							name={getDisplayName(record.user_id, record.first_name, record.last_name)}
							score={record.score}
							currentUser={record.currentUser}
							user_id={record.user_id}
							profileImg={record.profile_image}
							ref={record.currentUser ? currentUserScoreRecord : null}
						/>
					))}
			</Fragment>
		</Stack>
	);
}