import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import React, { FC } from "react";
import AccessibleDocument from "../../molecules/documents/AccessibleDocument";
import UnaccessibleDocument from "../../molecules/documents/UnaccessibleDocument";
import { useParams } from "react-router-dom";
import { DocumentType } from "apps/ashbaria/types";
import ArchiveIcon from "../../atoms/icons/Archive";
import BackButton from "../../molecules/buttons/Back";
import DocumentIcon from "../../atoms/icons/Document";
import UnaccessibleDocumentIcon from "../../atoms/icons/UnaccessibleDocument";

type DocumentsPropsType = {
	documents: DocumentType[];
}

const Documents: FC<DocumentsPropsType> = ({
	documents,
}) => {
	const fsmId = parseInt(useParams().fsmId);

	return (
		<Stack width={'100%'} component={Paper} maxWidth='md' padding={2} spacing={2} position={'relative'}>
			<Stack
				direction={'row'}
				alignItems={'center'}
				justifyContent={'center'}
				spacing={0.5}
			>
				<Box position={'absolute'} top={4} left={8}>
					<BackButton destination={`/court/${fsmId}/`} />
				</Box>
				<ArchiveIcon />
				<Typography variant="h5">
					{'بایگانی اسناد'}
				</Typography>
			</Stack>
			<Stack spacing={1}>
				<Stack direction={'row'} alignItems={'center'}>
					<DocumentIcon />
					<Typography fontSize={16} fontWeight={700}>
						{'اسناد پرونده چپق‌فروشان'}
					</Typography>
				</Stack>
				<Stack>
					<Grid container spacing={2}>
						{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) =>
							<Grid item xs={3} sm={2}>
								<AccessibleDocument />
							</Grid>
						)}
					</Grid>
				</Stack>
			</Stack>
			<Stack spacing={1}>
				<Stack direction={'row'} alignItems={'center'}>
					<UnaccessibleDocumentIcon />
					<Typography fontSize={16} fontWeight={700} color={"#A198BB"}>
						{'اسناد پرونده‌ی چپق‌فروشان'}
					</Typography>
				</Stack>
				<Stack>
					<Grid container spacing={2}>
						{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) =>
							<Grid item xs={3} sm={2}>
								<UnaccessibleDocument />
							</Grid>
						)}
					</Grid>
				</Stack>
			</Stack>
		</Stack>
	);
}

export default Documents;