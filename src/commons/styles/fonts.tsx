const staticBaseUrl = 'https://static.sepid.org';

const EstedadFontVariants = [
  { weight: 100, name: 'Thin' },
  { weight: 200, name: 'ExtraLight' },
  { weight: 300, name: 'Light' },
  { weight: 400, name: 'Regular' },
  { weight: 500, name: 'Medium' },
  { weight: 600, name: 'SemiBold' },
  { weight: 700, name: 'Bold' },
  { weight: 800, name: 'Extrabold' },
  { weight: 900, name: 'Black' },
];

const VazirFontVariants = [
  { weight: 100, name: 'Thin' },
  { weight: 300, name: 'Light' },
  { weight: 400, name: 'Regular' },
  { weight: 500, name: 'Medium' },
  { weight: 700, name: 'Bold' },
];

const IranyekanFontVariants = [
  { weight: 100, name: 'Thin' },
  { weight: 300, name: 'Light' },
  { weight: 400, name: 'Regular' },
  { weight: 500, name: 'Medium' },
  { weight: 700, name: 'Bold' },
  { weight: 800, name: 'Extrabold' },
  { weight: 900, name: 'Black' },
  { weight: 950, name: 'Extrablack' }
];

const PinarFontVariants = [
  { weight: 300, name: 'Light' },
  { weight: 400, name: 'Regular' },
  { weight: 500, name: 'Medium' },
  { weight: 600, name: 'SemiBold' },
  { weight: 700, name: 'Bold' },
  { weight: 800, name: 'ExtraBold' },
  { weight: 900, name: 'Black' },
];


const EstedadFontFaceDeclarations = EstedadFontVariants
  .map(({ weight, name }) => `
    @font-face {
      font-family: 'Estedad';
      font-style: normal;
      font-weight: ${weight};
      src: local('Estedad'),
           url('${staticBaseUrl}/fonts/Estedad-${name}.woff2') format('woff2');
      font-display: swap;
    }
  `)
  .join('');

const VazirFontFaceDeclarations = VazirFontVariants
  .map(({ weight, name }) => `
    @font-face {
      font-family: 'Vazir';
      font-style: normal;
      font-weight: ${weight};
      src: local('Vazir'),
           url('${staticBaseUrl}/fonts/Vazir-${name}.woff2') format('woff2');
      font-display: swap;
    }
  `)
  .join('');


const IranyekanFontFaceDeclarations = IranyekanFontVariants
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

const PinarFontFaceDeclarations = PinarFontVariants
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
  /* — your existing @font-face declarations — */
  ${EstedadFontFaceDeclarations}
  ${VazirFontFaceDeclarations}
  ${IranyekanFontFaceDeclarations}
  ${PinarFontFaceDeclarations}

  /* — your universal font-stack — */
  * {
    font-family: IRANYekan, Pinar-FD, Estedad, Vazir,
                 -apple-system, BlinkMacSystemFont, 'Segoe UI',
                 Roboto, Oxygen, Ubuntu, Cantarell,
                 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  /* — zero-out all <p> margins (and padding, if you like) — */
  p {
    margin: 0;
    padding: 0;
  }
`;