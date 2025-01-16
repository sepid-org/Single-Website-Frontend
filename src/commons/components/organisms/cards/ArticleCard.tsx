import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  Typography,
  ButtonBase,
} from '@mui/material';
import React, { FC } from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { ArticleType } from 'commons/types/redux/article';

type ArticleCardPropsType = {
  article: Partial<ArticleType>;
  mode: 'view' | 'edit';
};

const ArticleCard: FC<ArticleCardPropsType> = ({ article, mode }) => {
  const navigate = useNavigate();

  return (
    <ButtonBase
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: "100%",
        justifyContent: 'space-between',
        textAlign: 'initial',
        padding: 0,
      }}
      onClick={() => navigate(`/article/${article.id}/`)}
    >
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          width: '100%',
          justifyContent: 'space-between',
          boxShadow: '0 0 1px 0rem rgba(0, 0, 0, 0.5)',
          transition: 'all 0.1s ease-in-out',
          '&:hover': {
            transform: 'translateY(-0.1rem) scale(1.02)',
            boxShadow: '0 0.5em 2rem -1rem rgba(0, 0, 0, 0.5)',
          },
        }}
      >
        <Box>
          <CardMedia
            sx={{ height: 200 }}
            image={article.cover_page ? article.cover_page : `${process.env.PUBLIC_URL}/logo.png`}
            title={article.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {article.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {article.description}
            </Typography>
          </CardContent>
        </Box>
        <CardActions>
          <ButtonGroup fullWidth>
            {mode === 'edit' && (
              <Button component={Link} to={`/edit-article/${article.id}/`}>
                {'ویرایش'}
              </Button>
            )}
          </ButtonGroup>
        </CardActions>
      </Card>
    </ButtonBase>
  );
};

export default ArticleCard;