import React, { FC } from "react";
import { Stack, Typography } from "@mui/material";
import LockIcon from "../../atoms/icons/Lock";
import { DocumentType } from "apps/ashbaria/types";

type PropsType = {
	document: DocumentType;
}

const UnaccessibleDocument: FC<PropsType> = ({ document }) => {

	function truncateText(text, maxLength) {
		if (text.length <= maxLength) return text;
		const truncated = text.slice(0, maxLength);
		const lastSpaceIndex = truncated.lastIndexOf(' ');

		return lastSpaceIndex !== -1 ? truncated.slice(0, lastSpaceIndex) + '...' : truncated + '...';
	}

	const truncatedTitle = truncateText(document.title, 20);

	return (
		<Stack
			height={160}
			alignItems={'center'}
			justifyContent={'center'}
			borderRadius={2}
			paddingY={1.5}
			paddingX={1}
			spacing={1}
			sx={{
				boxShadow: "0px 2px 6px 0px #0000001A",
				backgroundColor: "#00000066"
			}}
		>
			<LockIcon size={68} />
			<Typography color={'#60557E'} fontSize={16} fontWeight={400} textAlign={'center'}>
				{truncatedTitle}
			</Typography>
		</Stack>
	)
}

export default UnaccessibleDocument;
