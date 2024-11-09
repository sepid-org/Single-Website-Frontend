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
		localNavigate(`/court/${fsmId}/info/?dialog=court-documents&document=${document.id}`)
	}

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
				{document.title}
			</Typography>
		</Stack>
	)
}

export default AccessibleDocument;