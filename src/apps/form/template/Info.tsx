import {
  Button,
  Stack,
  Typography,
} from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetFormQuery } from 'apps/website-display/redux/features/form/FormSlice';
import { FormType } from 'commons/types/models';

type InfoPropsType = {}

const Info: FC<InfoPropsType> = ({ }) => {
  const { articleId: formId } = useParams();
  const [properties, setProperties] = useState<FormType>();
  const { data: form } = useGetFormQuery({ formId });

  useEffect(() => {
    if (form) {
      setProperties(form);
    }
  }, [form]);

  const handleUpdateArticle = () => {

  }

  return (
    <Stack spacing={2} alignItems={'stretch'} justifyContent={'center'}>
      <Stack padding={2}>
        <Stack direction={'row'} alignItems={'start'} justifyContent={'space-between'}>
          <Typography variant='h2' gutterBottom>
            {'مشخصات فرم'}
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