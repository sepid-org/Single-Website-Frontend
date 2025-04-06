const staticBaseUrl = 'https://static.sepid.org';

const IranYekanFontVariants = [
  { weight: 100, name: 'Thin' },
  { weight: 300, name: 'Light' },
  { weight: 400, name: 'Regular' },
  { weight: 500, name: 'Medium' },
  { weight: 700, name: 'Bold' },
  { weight: 800, name: 'Extrabold' },
  { weight: 900, name: 'Black' },
  { weight: 950, name: 'Extrablack' }
];

const PinarFDFontVariants = [
  { weight: 300, name: 'Light' },
  { weight: 400, name: 'Regular' },
  { weight: 500, name: 'Medium' },
  { weight: 600, name: 'SemiBold' },
  { weight: 700, name: 'Bold' },
  { weight: 800, name: 'ExtraBold' },
  { weight: 900, name: 'Black' },
];


const IranYekanFontFaceDeclarations = IranYekanFontVariants
  .map(({ weight, name }) => `
    @font-face {
      font-family: 'IRANYekan';
      font-style: normal;
      font-weight: ${weight};
      src: local('IRANYekan'),
           url('${staticBaseUrl}/fonts/Iranyekan-${name}.woff2') format('woff2');
      font-display: swap;
    }
  `)
  .join('');

const PinarFontFaceDeclarations = PinarFDFontVariants
  .map(({ weight, name }) => `
    @font-face {
      font-family: 'Pinar-FD';
      font-style: normal;
      font-weight: ${weight};
      src: url('${staticBaseUrl}/fonts/Pinar-FD-${name}.woff2') format('woff2');
      font-display: swap;
    }
  `)
  .join('');

export const fontsStyles = `
  ${IranYekanFontFaceDeclarations}
  ${PinarFontFaceDeclarations}
  * {
    font-family: 'IRANYekan', 'Pinar-FD', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;