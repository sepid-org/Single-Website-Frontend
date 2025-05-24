import {
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { Pagination } from '@mui/material';
import React, { useState, Fragment, FC } from 'react';
import { ITEMS_PER_PAGE_NUMBER } from 'commons/constants/Constants';
import AddNewThingButton from 'commons/components/atoms/AddNewThingButton';
import { useGetArticlesQuery } from 'apps/website-display/redux/features/article/ArticleSlice';
import NoDataFound from 'commons/components/molecules/NoDataFound';
import CreateArticleDialog from 'commons/components/organisms/dialogs/CreateArticleDialog';
import EditArticleCard from 'commons/components/organisms/cards/EridArticleCard';
import { useSearchParams } from 'react-router-dom';

type ArticlesTabPropsType = {
}

const ArticlesTab: FC<ArticlesTabPropsType> = ({
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const openCreateDialog = searchParams.get('openCreateDialog');
  const [openCreateArticleDialog, setOpenCreateArticleDialog] = useState(false || openCreateDialog === 'true');
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading } = useGetArticlesQuery({ pageNumber });

  const articles = data?.articles || [];
  const count = data?.count || 0;

  return (
    <Fragment>
      <Grid
        container
        item
        spacing={2}
        alignItems="center"
        justifyContent="center"
        direction="row">

        <Grid item container justifyContent='space-between' xs={12} spacing={2}>
          <Grid item>
            <Typography variant='h2'>
              {'مقاله‌ها'}
            </Typography>
          </Grid>
          <Grid item>
            <AddNewThingButton
              label={'ایجاد مقاله جدید'}
              onClick={() => {
                setOpenCreateArticleDialog(true);
              }} />
          </Grid>
        </Grid>

        <Grid container spacing={2}
          alignItems='stretch'
          margin='10px 5px'
          justifyContent="center"
          sx={(theme) => ({
            height: '100%',
            justifyContent: 'start',
            [theme.breakpoints.down('sm')]: {
              justifyContent: 'center',
              marginRight: "0px",
            },
          })}>
          {(!isLoading && articles.length == 0) &&
            <Stack width={'100%'}>
              <NoDataFound variant={1} />
            </Stack>
          }
          {articles?.map((article) => (
            <Grid container item xs={12} sm={6} md={4} key={article.id} alignItems='center' justifyContent='center'>
              <EditArticleCard article={article} />
            </Grid>
          ))}
        </Grid>

        <Grid item container>
          <Grid item>
            <Pagination
              variant="outlined"
              color="primary"
              shape='rounded'
              count={Math.ceil(count / ITEMS_PER_PAGE_NUMBER)}
              page={pageNumber}
              onChange={(e, value) => setPageNumber(value)}
            />
          </Grid>
        </Grid>
      </Grid>
      <CreateArticleDialog
        open={openCreateArticleDialog}
        handleClose={() => {
          setOpenCreateArticleDialog(false);
          setSearchParams({
            tab: 'articles',
          });
        }}
      />
    </Fragment>
  );
}

export default ArticlesTab;
