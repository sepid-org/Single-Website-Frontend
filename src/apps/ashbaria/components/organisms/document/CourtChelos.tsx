import { Box, Stack, Typography, Paper, IconButton, useTheme } from "@mui/material";
import React, { FC, useState } from "react";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CustomDocumentPagination from "../../molecules/CustomDocumentsPagination";
import { useParams, useSearchParams } from "react-router-dom";
import BackButton from "../../molecules/buttons/Back";
import Document from "./Document";
import { useGetResourcesByTypeQuery } from "commons/redux/apis/cms/resource/Resource";
import { ASHBARIA_CHELO_TYPE } from "apps/ashbaria/constants/game-info";
import { AshbariaDocumentType } from "apps/ashbaria/types";
import CheloIcon from "../../atoms/icons/Chelo";

type PropsType = {}

const CourtChelos: FC<PropsType> = ({ }) => {
	const theme = useTheme();
	const [currentCheloIndex, setCurrentCheloIndex] = useState(0);
	const [searchParams, setSearchParams] = useSearchParams();
	const fsmId = parseInt(useParams().fsmId);
	const { data: allChelos, isLoading } = useGetResourcesByTypeQuery<{ data: AshbariaDocumentType[], isLoading: boolean; }>({ type: ASHBARIA_CHELO_TYPE })
	const courtChelos = allChelos?.filter(chelo => chelo.content.fsm_id === fsmId) || [];

	const currentChelo = courtChelos[currentCheloIndex];

	const goToPreviousChelo = () => {
		if (currentCheloIndex > 0) {
			setCurrentCheloIndex(currentCheloIndex - 1);
		}
	};

	const goToNextChelo = () => {
		if (currentCheloIndex < courtChelos.length - 1) {
			setCurrentCheloIndex(currentCheloIndex + 1);
		}
	};

	return (
		<Stack width={'100%'} height={`calc(100vh - ${theme.spacing(8)})`} component={Paper} maxWidth='md' padding={2} spacing={2} position={'relative'}>
			<Stack alignItems={'center'} justifyContent={'center'} direction={'row'}>
				<Box position={'absolute'} top={2} left={8}>
					<BackButton destination={`/court/${fsmId}/`} />
				</Box>

				<Stack alignItems={'center'} direction={'row'} spacing={0.5}>
					<CheloIcon size={32} />
					<Typography variant="h5">
						{'چلوها'}
					</Typography>
				</Stack>

			</Stack>

			<Document document={currentChelo} isLoading={isLoading} />

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
							onClick={goToPreviousChelo}
						>
							<ArrowForwardIcon />
						</IconButton>
					</Box>

					<CustomDocumentPagination
						numberOfPages={courtChelos.length}
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
							visibility: (currentCheloIndex < courtChelos.length - 1 ? "visible" : "hidden"),
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
							onClick={goToNextChelo}
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