import React from 'react';
import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import { useParams } from 'react-router-dom';
import { ClassifiedDocumentsType, DocumentType } from 'apps/ashbaria/types';
import ArchiveIcon from '../../atoms/icons/Archive';
import BackButton from '../../molecules/buttons/Back';
import DocumentIcon from '../../atoms/icons/Document';
import UnaccessibleDocumentIcon from '../../atoms/icons/UnaccessibleDocument';
import AccessibleDocument from '../../molecules/documents/AccessibleDocument';
import UnaccessibleDocument from '../../molecules/documents/UnaccessibleDocument';

// Types
type DocumentSectionProps = {
	courtName: string;
	documents: DocumentType[];
	enabled: boolean;
};

type HeaderProps = {
	fsmId: number;
};

// Header Component
const Header: React.FC<HeaderProps> = ({ fsmId }) => (
	<Stack
		direction="row"
		alignItems="center"
		justifyContent="center"
		spacing={0.5}
	>
		<Box position="absolute" top={4} left={8}>
			<BackButton destination={`/court/${fsmId}/`} />
		</Box>
		<ArchiveIcon />
		<Typography variant="h5">{'بایگانی اسناد'}</Typography>
	</Stack>
);

// Document Grid Component
const DocumentGrid: React.FC<{ documents: DocumentType[]; enabled: boolean }> = ({
	documents,
	enabled
}) => (
	<Grid container spacing={2}>
		{documents.map((document) => (
			<Grid item key={document.id} xs={3} sm={2}>
				{enabled ? <AccessibleDocument document={document} /> : <UnaccessibleDocument document={document} />}
			</Grid>
		))}
	</Grid>
);

// Empty State Component
const EmptyState: React.FC = () => (
	<Stack alignItems="center" justifyContent="center">
		<UnaccessibleDocumentIcon size={70} />
		<Typography>{'سند و مدرکی برای این پرونده وجود ندارد'}</Typography>
	</Stack>
);

// Document Section Component
const DocumentSection: React.FC<DocumentSectionProps> = ({
	courtName,
	documents,
	enabled
}) => {
	const IconComponent = enabled ? DocumentIcon : UnaccessibleDocumentIcon;

	return (
		<Stack spacing={1}>
			<Stack direction="row" alignItems="center">
				<IconComponent />
				<Typography
					fontSize={16}
					fontWeight={700}
					color={enabled ? "inherit" : "#A198BB"}
				>
					{courtName}
				</Typography>
			</Stack>
			<Stack>
				{documents.length > 0 ? (
					<DocumentGrid documents={documents} enabled={enabled} />
				) : (
					<EmptyState />
				)}
			</Stack>
		</Stack>
	);
};

// Main Component
const DocumentsArchive: React.FC<{ documents: ClassifiedDocumentsType }> = ({
	documents
}) => {
	const { fsmId } = useParams();
	const parsedFsmId = parseInt(fsmId);

	return (
		<Stack
			width="100%"
			component={Paper}
			maxWidth="md"
			padding={2}
			spacing={2}
			position="relative"
		>
			<Header fsmId={parsedFsmId} />

			{Object.entries(documents).map(([id, { courtName, enabled, documents }]) => (
				<DocumentSection
					key={id}
					courtName={courtName}
					documents={documents}
					enabled={enabled}
				/>
			))}
		</Stack>
	);
};

export default DocumentsArchive;