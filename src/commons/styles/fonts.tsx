const staticBaseUrl = 'https://static.sepid.org';

// Define font weights and their corresponding filenames
const IranYekanfontVariants = [
  { weight: 100, name: 'thin' },
  { weight: 300, name: 'light' },
  { weight: 400, name: 'regular' },
  { weight: 500, name: 'medium' },
  { weight: 700, name: 'bold' },
  { weight: 800, name: 'extrabold' },
  { weight: 900, name: 'black' },
  { weight: 950, name: 'extrablack' }
];

const PinarfontVariants = [
  { weight: 900, name: 'Black' },
  { weight: 800, name: 'ExtraBold' },
  { weight: 700, name: 'Bold' },
  { weight: 400, name: 'Regular' }
];


// Generate @font-face declarations dynamically
const IranYekanfontFaceDeclarations = IranYekanfontVariants
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

const PinarfontFaceDeclarations = PinarfontVariants
  .map(({ weight, name }) => `
    @font-face {
      font-family: 'Pinar-FD';
      font-style: normal;
      font-weight: ${weight};
      src: local('Pinar-FD'),
           url('${staticBaseUrl}/fonts/Pinar-FD-${name}.woff2') format('woff2');
      font-display: swap;
    }
  `)
  .join('');

export const fontsStyles = `
  ${IranYekanfontFaceDeclarations}
  ${{PinarfontFaceDeclarations}}
  * {
    font-family: 'IRANYekan', 'Pinar-FD', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;