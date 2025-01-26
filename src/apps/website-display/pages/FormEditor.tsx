import { Stack, Typography } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from 'commons/template/Layout';
import { PaperEditor } from 'commons/template/Paper';
import { useGetArticleQuery } from 'apps/website-display/redux/features/article/ArticleSlice';

const FormEditor = ({ }) => {
	const { formId } = useParams();

	return (
		<Layout appbarMode='ARTICLE'>
			<Stack spacing={2} maxWidth='md' sx={{ width: '100%', paddingBottom: 2 }}>
				<PaperEditor paperId={formId} />
			</Stack>
		</Layout>
	);
};

export default FormEditor;
