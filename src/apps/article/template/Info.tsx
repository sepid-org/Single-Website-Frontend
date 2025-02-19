import {
  Box,
  Button,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetArticleQuery, useUpdateArticleMutation } from 'apps/website-display/redux/features/article/ArticleSlice';
import { ArticleType } from 'commons/types/redux/article';
import ArticleInfoForm from 'commons/components/organisms/forms/ArticleInfoForm';
import { toast } from 'react-toastify';
import SoftDeleteArticleButton from 'commons/components/atoms/SoftDeleteArticleButton';

type InfoPropsType = {}

const Info: FC<InfoPropsType> = ({ }) => {
  const { articleId } = useParams();
  const [properties, setProperties] = useState<Partial<ArticleType>>();
  const { data: article } = useGetArticleQuery({ articleId });
  const [updateArticle, result] = useUpdateArticleMutation();


  useEffect(() => {
    if (article) {
      setProperties(article);
    }
  }, [article]);

  const handleUpdateArticle = () => {
    if (!properties.name) {
      toast.error('لطفاً نام مقاله را انتخاب کنید.');
      return;
    }
    updateArticle({
      articleId,
      ...properties
    });
  }

  useEffect(() => {
    if (result.isSuccess) {
      toast.success('مشخصات مقاله با موفقیت به‌روز شد.')
    }
  }, [result])

  return (
    <Stack spacing={2} alignItems={'stretch'} justifyContent={'center'}>
      <Stack padding={2} spacing={2}>
        <Stack direction={'row'} alignItems={'start'} justifyContent={'space-between'}>
          <Typography variant='h2' gutterBottom>
            {'مشخصات مقاله'}
          </Typography>
          <SoftDeleteArticleButton />
        </Stack>
        <Box>
          {properties &&
            <ArticleInfoForm data={properties} setData={setProperties} showCoverImage={true} />
          }
        </Box>
      </Stack>

      <Divider />

      <Stack padding={2} spacing={2}>
        <Typography variant='h2' gutterBottom>
          {'تنظیمات ظاهری'}
        </Typography>
        {/* دکمه‌های سوالات متداول + راهنمای سایت + اپ‌بار و هدر و اوپن‌گراف سایت */}
        <Typography>
          {'todo'}
        </Typography>
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