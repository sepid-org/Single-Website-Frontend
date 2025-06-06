import { Stack, Typography } from "@mui/material";
import React, { FC } from "react";
import WidgetsPaper from "commons/template/Paper";
import UnaccessibleDocumentIcon from "../../atoms/icons/UnaccessibleDocument";
import { AshbariaDocumentType } from "apps/ashbaria/types";

type PropsType = {
	document: AshbariaDocumentType;
	isLoading: boolean;
}

const Document: FC<PropsType> = ({ document, isLoading }) => {

	if (isLoading) {
		return;
	}

	if (!document) {
		return (
			<Stack height={'100%'} alignItems="center" justifyContent="center">
				<UnaccessibleDocumentIcon size={70} />
				<Typography>{'سندی وجود ندارد'}</Typography>
			</Stack>
		);
	} else {
		return (
			<Stack
				spacing={2}
				height={'100%'}
				paddingX={1}
				sx={{
					overflowY: 'auto',
					overflowX: 'hidden',
					'::-webkit-scrollbar': {
						height: '8px',
					},
					'::-webkit-scrollbar-thumb': {
						backgroundColor: '#b0bec5',
						borderRadius: '4px',
					},
					'::-webkit-scrollbar-thumb:hover': {
						backgroundColor: '#90a4ae',
					},
				}}>
				<WidgetsPaper mode="general" paperId={document.content.paper_id.toString()} />
			</Stack>
		)
	}
}

export default Document;