import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  ButtonBase,
} from '@mui/material';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArticleType } from 'commons/types/redux/article';

type ArticleCardPropsType = {
  article: Partial<ArticleType>;
};

const ArticleCard: FC<ArticleCardPropsType> = ({ article }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/article/${article.id}/`);
  };

  return (
    <ButtonBase
      disableRipple
      onClick={handleCardClick}
      sx={{
        width: '100%',
        height: '100%',
        textAlign: 'left',
      }}
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
            image={article.cover_image ? article.cover_image : `${process.env.PUBLIC_URL}/logo.png`}
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
      </Card>
    </ButtonBase>
  );
};

export default ArticleCard;