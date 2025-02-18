import { Stack } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import { PaperEditor } from 'commons/template/Paper';

const FormPaperEditor = ({ }) => {
	const { formId } = useParams();

	return (
		<Stack spacing={2} maxWidth='md' sx={{ width: '100%', paddingBottom: 2 }}>
			<PaperEditor paperId={formId} />
		</Stack>
	);
};

export default FormPaperEditor;
