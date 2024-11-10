import React, { FC } from "react";
import { Stack, Typography } from "@mui/material";
import DocumentIcon from "../../atoms/icons/Document";
import { DocumentType } from "apps/ashbaria/types";
import useLocalNavigate from "apps/ashbaria/hooks/useLocalNavigate";
import { useParams } from "react-router-dom";

type PropsType = {
	document: DocumentType;
}

const AccessibleDocument: FC<PropsType> = ({ document }) => {
	const fsmId = parseInt(useParams().fsmId);
	const localNavigate = useLocalNavigate();

	const onClick = () => {
		localNavigate(`/court/${fsmId}/info/?dialog=court-documents&fsmId=${document.fsm}&documentId=${document.id}`)
	}

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
			onClick={onClick}
			sx={{
				boxShadow: "0px 2px 6px 0px #0000001A",
				backgroundColor: "#00000066",
				cursor: 'pointer',
				'&:hover': {
					opacity: 0.9,
					transition: 'opacity 0.2s'
				}
			}}
		>
			<DocumentIcon size={72} />
			<Typography fontSize={16} fontWeight={400} color={'#FFA800'} textAlign={'center'}>
				{truncatedTitle}
			</Typography>
		</Stack>
	)
}

export default AccessibleDocument;