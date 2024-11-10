import { Box, Stack, Typography, Paper, IconButton, useTheme } from "@mui/material";
import React, { FC, useState } from "react";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CustomDocumentPagination from "../../molecules/CustomDocumentsPagination";
import ArchiveIcon from "../../atoms/icons/Archive";
import { useParams, useSearchParams } from "react-router-dom";
import BackButton from "../../molecules/buttons/Back";
import Document from "./Document";
import { useGetResourcesByTypeQuery } from "commons/redux/apis/cms/resource/Resource";
import { ASHBARIA_DOCUMENT_TYPE } from "apps/ashbaria/constants/game-info";
import { AshbariaDocumentType } from "apps/ashbaria/types";

type PropsType = {}

const CourtChelos: FC<PropsType> = ({ }) => {
	const theme = useTheme();
	const [currentCheloIndex, setCurrentCheloIndex] = useState(0)
	const [searchParams, setSearchParams] = useSearchParams();
	const fsmId = parseInt(useParams().fsmId);
	const { data: allDocuments } = useGetResourcesByTypeQuery<{ data: AshbariaDocumentType[] }>({ type: ASHBARIA_DOCUMENT_TYPE })
	const documents = allDocuments?.filter(document => document.content.fsm_id === fsmId) || [];

	const currentChelo = documents[currentCheloIndex];

	const goToPreviousDocument = () => {
		if (currentCheloIndex > 0) {
			const prevDocument = documents[currentCheloIndex - 1];
			setSearchParams({
				dialog: 'court-chelos',
				documentId: prevDocument.id.toString(),
			});
		}
	};

	const goToNextDocument = () => {
		if (currentCheloIndex < documents.length - 1) {
			const nextDocument = documents[currentCheloIndex + 1];
			setSearchParams({
				dialog: 'court-chelos',
				documentId: nextDocument.id.toString(),
			});
		}
	};

	return (
		<Stack width={'100%'} height={`calc(100vh - ${theme.spacing(8)})`} component={Paper} maxWidth='md' padding={2} spacing={2} position={'relative'}>
			<Stack alignItems={'center'} justifyContent={'center'} direction={'row'}>
				<Box position={'absolute'} top={2} left={8}>
					<BackButton destination={`/court/${fsmId}/`} />
				</Box>

				<Stack alignItems={'center'} direction={'row'} spacing={0.5}>
					<ArchiveIcon />
					<Typography variant="h5">
						{'چلوها'}
					</Typography>
				</Stack>

			</Stack>

			<Document document={currentChelo} />

			{currentChelo &&
				<Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							height: 42,
							width: 42,
							borderRadius: "100%",
							backgroundClip: "padding-box",
							position: "relative",
							overflow: "hidden",
							background: "linear-gradient(to right, #FE9C42, #E25100)",
							visibility: (currentCheloIndex > 0 ? "visible" : "hidden"),
						}}
					>
						<IconButton
							sx={{
								height: 40,
								width: 40,
								borderRadius: "100%",
								backgroundColor: "#130e15",
								backgroundClip: "padding-box",
								color: "#FE9C42",
							}}
							onClick={goToPreviousDocument}
						>
							<ArrowForwardIcon />
						</IconButton>
					</Box>

					<CustomDocumentPagination
						numberOfPages={documents.length}
						currentPage={currentCheloIndex}
					/>

					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							height: 42,
							width: 42,
							borderRadius: "100%",
							backgroundClip: "padding-box",
							position: "relative",
							overflow: "hidden",
							background: "linear-gradient(to right, #FE9C42, #E25100)",
							visibility: (currentCheloIndex < documents.length - 1 ? "visible" : "hidden"),
						}}
					>
						<IconButton
							sx={{
								height: 40,
								width: 40,
								borderRadius: "100%",
								backgroundColor: "#130e15",
								backgroundClip: "padding-box",
								color: "#FE9C42",
							}}
							onClick={goToNextDocument}
						>
							<ArrowBackIcon />
						</IconButton>
					</Box>
				</Stack>
			}
		</Stack>
	);
}

export default CourtChelos;