import {
  Button,
  Stack,
  Typography,
} from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetArticleQuery } from 'apps/website-display/redux/features/article/ArticleSlice';
import { ArticleType } from 'commons/types/redux/article';

type InfoPropsType = {}

const Info: FC<InfoPropsType> = ({ }) => {
  const { articleId } = useParams();
  const [properties, setProperties] = useState<ArticleType>();
  const { data: article } = useGetArticleQuery({ articleId });

  useEffect(() => {
    if (article) {
      setProperties(article);
    }
  }, [article]);

  const handleUpdateArticle = () => {

  }

  return (
    <Stack spacing={2} alignItems={'stretch'} justifyContent={'center'}>
      <Stack padding={2}>
        <Stack direction={'row'} alignItems={'start'} justifyContent={'space-between'}>
          <Typography variant='h2' gutterBottom>
            {'مشخصات مقاله'}
          </Typography>
        </Stack>
        <Stack>
          todo
        </Stack>
      </Stack>

      <Stack padding={2} alignItems={'end'}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpdateArticle}>
          {'به‌روز‌رسانی'}
        </Button>
      </Stack>
    </Stack>
  );
}


export default Info;