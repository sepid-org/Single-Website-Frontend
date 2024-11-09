import { Box, Button, Stack, Typography, Paper, IconButton, useTheme } from "@mui/material";
import React, { FC, Fragment, useEffect, useState } from "react";
import WidgetsPaper from "commons/template/Paper";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CustomDocumentPagination from "../../molecules/CustomDocumentsPagination";
import OutlinedArchiveIcon from "../../atoms/icons/OutlinedArchive";
import ArchiveIcon from "../../atoms/icons/Archive";
import { useParams, useSearchParams } from "react-router-dom";
import BackButton from "../../molecules/buttons/Back";
import { DocumentType } from "apps/ashbaria/types";
import UnaccessibleDocumentIcon from "../../atoms/icons/UnaccessibleDocument";

type PropsType = {
	documents: DocumentType[];
}

const CourtDocuments: FC<PropsType> = ({ documents = [] }) => {
	const fsmId = parseInt(useParams().fsmId);
	const theme = useTheme();
	const [currentPage, setCurrentPage] = useState(null);
	const [searchParams, setSearchParams] = useSearchParams();
	const documentId = parseInt(searchParams.get('document'));
	const currentDocument = documents.find(document => document.id === documentId);

	useEffect(() => {
		if (documents) {
			setCurrentPage(documents.findIndex(document => document.id === documentId));
		}
	}, [documentId, documents])

	useEffect(() => {
		if (!documentId && documents.length > 0) {
			setSearchParams({
				dialog: 'court-documents',
				document: documents[0].id.toString(),
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
				document: prevDocument.id.toString(),
			});
			setCurrentPage(currentPage - 1);
		}
	};

	const goToNextDocument = () => {
		if (currentPage < documents.length - 1) {
			const nextDocument = documents[currentPage + 1];
			setSearchParams({
				dialog: 'court-documents',
				document: nextDocument.id.toString(),
			});
			setCurrentPage(currentPage + 1);
		}
	};

	if (currentPage === null) {
		return;
	}

	let body = null;
	if (currentPage === -1) {
		body =
			<Stack height={'100%'} alignItems="center" justifyContent="center">
				<UnaccessibleDocumentIcon size={70} />
				<Typography>{'سند و مدرکی برای این پرونده وجود ندارد'}</Typography>
			</Stack>
	} else {
		body =
			<Fragment>
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
					<WidgetsPaper mode="general" paperId={currentDocument.paper?.toString()} />
				</Stack>

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
						setCurrentPage={setCurrentPage}
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
			</Fragment>
	}

	return (
		<Stack width={'100%'} height={`calc(100vh - ${theme.spacing(8)})`} component={Paper} maxWidth='md' padding={2} spacing={2} position={'relative'}>
			<Stack alignItems={'center'} justifyContent={'center'} direction={'row'}>
				<Box position={'absolute'} top={2} left={8}>
					<BackButton destination={`/court/${fsmId}/`} />
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

			{body}

		</Stack>
	);
}

export default CourtDocuments;