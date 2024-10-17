import React from 'react';
import { styled } from '@mui/material/styles';

const StyledWrapper = styled('div')`
  @font-face {
    font-family: 'Pinar-FD';
    src: url('https://kamva-minio-storage.darkube.app/fonts/Pinar-FD-Black.woff2') format('woff2');
    font-weight: 900;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Pinar-FD';
    src: url('https://kamva-minio-storage.darkube.app/fonts/Pinar-FD-ExtraBold.woff2') format('woff2');
    font-weight: 800;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Pinar-FD';
    src: url('https://kamva-minio-storage.darkube.app/fonts/Pinar-FD-Bold.woff2') format('woff2');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Pinar-FD';
    src: url('https://kamva-minio-storage.darkube.app/fonts/Pinar-FD-Regular.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  * {
    font-family: 'Pinar-FD';
  }
`;

export const PinarFontWrapper = ({ children }) => {
  return <StyledWrapper>{children}</StyledWrapper>;
};