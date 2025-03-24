import React, { useEffect, useRef } from "react";
import { Box, Stack } from "@mui/material";
import TableRecord from "../molecules/TableRecord";
import ScoreRecordsSkeleton from "../molecules/TableRecordsSkeleton";
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
	allScores: {
		currentUser: {
			first_name: string;
			last_name: string;
			user_id: string;
			score: number;
			rank: null | number;
			currentUser: boolean;
		};
		currentUserExistsInWinners: boolean;
		winnerUsersInfo: WinnerRecord[];
	};
}

const Table: React.FC<PropsType> = ({ allScores }) => {
	const currentUserRef = useRef(null);

	useEffect(() => {
		if (currentUserRef.current) {
			currentUserRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
		}
	}, [allScores.winnerUsersInfo]);

	return (
		<Stack width={'100%'} alignItems={'center'} justifyContent={'center'} spacing={2}>
			{allScores.winnerUsersInfo.length > 0 ?
				allScores.winnerUsersInfo.map((record, index) => (
					<TableRecord
						key={record.user_id}
						rank={index + 1}
						name={getDisplayName(record.user_id, record.first_name, record.last_name)}
						score={record.score}
						currentUser={record.currentUser}
					/>
				)) :
				<ScoreRecordsSkeleton />
			}
			{(allScores.currentUser != null && allScores.winnerUsersInfo && !allScores.currentUserExistsInWinners) &&
				<>
					<Box sx={{ marginTop: 0, marginBottom: 2 }}>
						<Box sx={{ backgroundColor: "white", borderRadius: "50%", width: "10px", height: "10px", margin: "2px" }} />
						<Box sx={{ backgroundColor: "white", borderRadius: "50%", width: "10px", height: "10px", margin: "2px" }} />
						<Box sx={{ backgroundColor: "white", borderRadius: "50%", width: "10px", height: "10px", margin: "2px" }} />
					</Box>
					<TableRecord
						key={allScores.currentUser.user_id}
						rank={allScores.currentUser.rank}
						name={getDisplayName(allScores.currentUser.user_id, allScores.currentUser.first_name, allScores.currentUser.last_name)}
						score={allScores.currentUser.score}
						currentUser={allScores.currentUser.currentUser}
					/>
				</>
			}
		</Stack>
	);
}
export default Table;