import React from "react";
import { Stack } from "@mui/material";
import WinnerCard from "../molecules/WinnerCard";
import WinnerCardsSkeleton from "../molecules/WinnerCardsSkeleton";
import { toPersianNumber } from "commons/utils/translateNumber";
import hashStringToNumber from "commons/utils/hashStringToNumber";
import { WinnerRecord } from "../../types";

const getDisplayName = (user_id: string, first_name: string, last_name: string) => {
	if (first_name && last_name) {
		return `${first_name} ${last_name}`;
	}
	const hashCode = hashStringToNumber(user_id);
	return `کاربر ${toPersianNumber(hashCode.toString().padStart(4, '0'))}`;
}

type PropsType = {
	winnerScores: WinnerRecord[]
}

const TopThree: React.FC<PropsType> = ({ winnerScores }) => {
	if (winnerScores?.length > 0) {
		return (
			<Stack direction={'row'} alignItems={'end'}>
				<WinnerCard
					score={winnerScores[2]?.score}
					rank={3}
					name={getDisplayName(winnerScores[2]?.user_id, winnerScores[2]?.first_name, winnerScores[2]?.last_name)}
				/>
				<WinnerCard
					score={winnerScores[0]?.score}
					rank={1}
					name={getDisplayName(winnerScores[0]?.user_id, winnerScores[0]?.first_name, winnerScores[0]?.last_name)}
				/>
				<WinnerCard
					score={winnerScores[1]?.score}
					rank={2}
					name={getDisplayName(winnerScores[1]?.user_id, winnerScores[1]?.first_name, winnerScores[1]?.last_name)}
				/>
			</Stack>
		);
	} else {
		return (
			<WinnerCardsSkeleton />
		);
	}
}
export default TopThree;