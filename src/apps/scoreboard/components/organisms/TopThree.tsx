import React from "react";
import { Stack } from "@mui/material";
import WinnerCard from "../molecules/WinnerCard";
import WinnerCardsSkeleton from "../molecules/WinnerCardsSkeleton";
import { toPersianNumber } from "commons/utils/translateNumber";
import hashStringToNumber from "commons/utils/hashStringToNumber";
import { TableRecordType } from "../../types";

const getDisplayName = (user_id: string, first_name: string, last_name: string) => {
	if (first_name && last_name) {
		return `${first_name} ${last_name}`;
	}
	const hashCode = hashStringToNumber(user_id);
	return `کاربر ${toPersianNumber(hashCode.toString().padStart(4, '0'))}`;
}

type PropsType = {
	winners: TableRecordType[]
}

const TopThree: React.FC<PropsType> = ({ winners }) => {
	if (winners?.length > 0) {
		return (
			<Stack direction={'row'} alignItems={'end'}>
				<WinnerCard
					score={winners[2]?.score}
					rank={3}
					name={getDisplayName(winners[2]?.user_id, winners[2]?.first_name, winners[2]?.last_name)}
				/>
				<WinnerCard
					score={winners[0]?.score}
					rank={1}
					name={getDisplayName(winners[0]?.user_id, winners[0]?.first_name, winners[0]?.last_name)}
				/>
				<WinnerCard
					score={winners[1]?.score}
					rank={2}
					name={getDisplayName(winners[1]?.user_id, winners[1]?.first_name, winners[1]?.last_name)}
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