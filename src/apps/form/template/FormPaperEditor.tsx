import { Stack } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import { PaperEditor } from 'commons/template/Paper';
import { useGetFormQuery } from 'apps/website-display/redux/features/form/FormSlice';

const FormPaperEditor = ({ }) => {
	const { formSlug } = useParams();
	const { data: form } = useGetFormQuery({ formSlug });

	return (
		<Stack spacing={2} maxWidth='md' sx={{ width: '100%', paddingBottom: 2 }}>
			<PaperEditor paperId={form?.id} />
		</Stack>
	);
};

export default FormPaperEditor;
