import React, { Fragment, useEffect, useRef } from "react";
import { Box, Stack } from "@mui/material";
import TableRecord from "../molecules/TableRecord";
import ScoreRecordsSkeleton from "../molecules/TableRecordsSkeleton";
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
	currentUser: {
		first_name: string;
		last_name: string;
		user_id: string;
		score: number;
		rank: null | number;
		currentUser: boolean;
	};
	currentUserExistsInWinners: boolean;
	records: TableRecordType[];
}

const Table: React.FC<PropsType> = ({ currentUser, currentUserExistsInWinners, records }) => {
	const currentUserRef = useRef(null);

	useEffect(() => {
		if (currentUserRef.current) {
			currentUserRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
		}
	}, [records]);

	return (
		<Stack width={'100%'} alignItems={'center'} justifyContent={'center'} spacing={2}>
			{records.length > 0 ?
				records.map((record, index) => (
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
			{(currentUser && records && !currentUserExistsInWinners) &&
				<Fragment>
					<Box sx={{ marginTop: 0, marginBottom: 2 }}>
						<Box sx={{ border: 1, backgroundColor: "white", borderRadius: "50%", width: "10px", height: "10px", margin: "2px" }} />
						<Box sx={{ border: 1, backgroundColor: "white", borderRadius: "50%", width: "10px", height: "10px", margin: "2px" }} />
						<Box sx={{ border: 1, backgroundColor: "white", borderRadius: "50%", width: "10px", height: "10px", margin: "2px" }} />
					</Box>
					<TableRecord
						key={currentUser.user_id}
						rank={currentUser.rank}
						name={getDisplayName(currentUser.user_id, currentUser.first_name, currentUser.last_name)}
						score={currentUser.score}
						currentUser={currentUser.currentUser}
					/>
				</Fragment>
			}
		</Stack>
	);
}
export default Table;