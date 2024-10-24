import React from 'react';
import movieSvg from "../../../assets/cinema-film-movie.svg";
import { Box } from '@mui/material';

const MovieIcon = (props) => {
  return (
    <Box
      component="img"
      src={movieSvg}
      sx={{
        width: 40,
      }}
    />
  );
};

export default MovieIcon;