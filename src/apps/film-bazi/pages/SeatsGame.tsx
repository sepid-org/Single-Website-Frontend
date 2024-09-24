import React, { FC, Fragment, useEffect, useRef, useState } from 'react';
import { Box, Container } from '@mui/material';
import AppBarComponent from '../components/organisms/Appbar';
import BoardPaper from 'commons/template/Paper/BoardPaper';

type SeatsGamePropsType = {}

const SeatsGame: FC<SeatsGamePropsType> = ({ }) => {
  const paperId = '2496';
  const appbarRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      let calculatedHeight = window.innerHeight;
      if (appbarRef.current) {
        calculatedHeight -= appbarRef.current.offsetHeight;
      }
      setContainerHeight(calculatedHeight);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Fragment>
      <Box ref={appbarRef}>
        <AppBarComponent />
      </Box>
      <Container
        maxWidth={false}
        sx={{
          display: 'flex',
          padding: 0,
          justifyContent: 'center',
          marginRight: 'auto !important',
          marginLeft: 'auto !important',
        }}>
        {containerHeight > 0 &&
          <BoardPaper
            containerHeight={containerHeight}
            paperId={paperId}
          />
        }
      </Container>
    </Fragment>
  );
};

export default SeatsGame;