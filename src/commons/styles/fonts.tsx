import { css } from 'styled-components';

const staticBaseUrl = 'https://static.sepid.org';

// Define font weights and their corresponding filenames
const fontVariants = [
  { weight: 100, name: 'thin' },
  { weight: 300, name: 'light' },
  { weight: 400, name: 'regular' },
  { weight: 500, name: 'medium' },
  { weight: 700, name: 'bold' },
  { weight: 800, name: 'extrabold' },
  { weight: 900, name: 'black' },
  { weight: 950, name: 'extrablack' }
];

// Generate @font-face declarations dynamically
const fontFaceDeclarations = fontVariants
  .map(({ weight, name }) => `
    @font-face {
      font-family: 'IRANYekan';
      font-style: normal;
      font-weight: ${weight};
      src: local('IRANYekan'),
           url('${staticBaseUrl}/fonts/Qs_Iranyekan ${name}.woff') format('woff');
      font-display: swap;
    }
  `)
  .join('');

export const fontsStyles = css`
  ${fontFaceDeclarations}

  * {
    font-family: 'IRANYekan', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;