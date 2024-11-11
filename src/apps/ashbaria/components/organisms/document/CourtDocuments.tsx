import { Box, Button, Stack, Typography, Paper, IconButton, useTheme } from "@mui/material";
import React, { FC, useEffect } from "react";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CustomDocumentPagination from "../../molecules/CustomDocumentsPagination";
import OutlinedArchiveIcon from "../../atoms/icons/OutlinedArchive";
import ArchiveIcon from "../../atoms/icons/Archive";
import { useParams, useSearchParams } from "react-router-dom";
import BackButton from "../../molecules/buttons/Back";
import Document from "./Document";
import { useGetResourcesByTypeQuery } from "commons/redux/apis/cms/resource/Resource";
import { ASHBARIA_DOCUMENT_TYPE } from "apps/ashbaria/constants/game-info";
import { AshbariaDocumentType } from "apps/ashbaria/types";

type PropsType = {}

const CourtDocuments: FC<PropsType> = ({ }) => {
	const theme = useTheme();
	const [searchParams, setSearchParams] = useSearchParams();
	const baseFSMId = parseInt(useParams().fsmId);
	const fsmId = parseInt(searchParams.get('fsmId'));
	const { data: allDocuments } = useGetResourcesByTypeQuery<{ data: AshbariaDocumentType[] }>({ type: ASHBARIA_DOCUMENT_TYPE })
	const documents = allDocuments?.filter(document => document.content.fsm_id === fsmId) || [];


	const documentId = parseInt(searchParams.get('documentId'));
	const currentDocument = documents.find(document => document.id === documentId);
	const currentPage = documents.findIndex(document => document.id === documentId);

	useEffect(() => {
		if (!documentId && documents.length > 0) {
			setSearchParams({
				dialog: 'court-documents',
				fsmId: fsmId.toString(),
				documentId: documents?.[0].id.toString(),
			})
		}
	}, [documents])

	const goToDocumentsArchive = () => {
		setSearchParams({
			dialog: 'documents-archive',
		})
	}

	const goToPreviousDocument = () => {
		if (currentPage > 0) {
			const prevDocument = documents[currentPage - 1];
			setSearchParams({
				dialog: 'court-documents',
				fsmId: fsmId.toString(),
				documentId: prevDocument.id.toString(),
			});
		}
	};

	const goToNextDocument = () => {
		if (currentPage < documents.length - 1) {
			const nextDocument = documents[currentPage + 1];
			setSearchParams({
				dialog: 'court-documents',
				fsmId: fsmId.toString(),
				documentId: nextDocument.id.toString(),
			});
		}
	};

	return (
		<Stack width={'100%'} height={`calc(100vh - ${theme.spacing(8)})`} component={Paper} maxWidth='md' padding={2} spacing={2} position={'relative'}>
			<Stack alignItems={'center'} justifyContent={'center'} direction={'row'}>
				<Box position={'absolute'} top={2} left={8}>
					<BackButton destination={`/court/${baseFSMId}/`} />
				</Box>

				<Stack alignItems={'center'} direction={'row'} spacing={0.5}>
					<ArchiveIcon />
					<Typography variant="h5">
						{currentDocument?.title || 'سند و مدرک‌ها'}
					</Typography>
				</Stack>

				<Box position={'absolute'} top={4} right={4} padding={1}>
					<Button startIcon={<OutlinedArchiveIcon />} onClick={goToDocumentsArchive}>
						<Typography
							variant="h6"
							sx={{ fontSize: "18px", fontWeight: 800, color: "white" }}
						>
							بایگانی
						</Typography>
					</Button>
				</Box>
			</Stack>

			<Document document={currentDocument} />

			{currentDocument &&
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
							visibility: (currentPage > 0 ? "visible" : "hidden"),
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
						currentPage={currentPage}
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
							visibility: (currentPage < documents.length - 1 ? "visible" : "hidden"),
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

export default CourtDocuments;