import React from 'react';
import { FormControl, Select, MenuItem, Typography } from '@mui/material';

interface FontSelectorProps {
  selectedFont: any;
  setSelectedFont: any;
}

const FontSelector: React.FC<FontSelectorProps> = ({ selectedFont, setSelectedFont }) => {

  const handleFontChange = (event) => {
    setSelectedFont(event.target.value);
  };

  const fontMap = {
    'Pinar-FD': 'پینار',
    'IRANYekan': 'ایران‌یکان',
    'Estedad': 'استعداد',
    'Vazir': 'وزیر',
  };

  const fonts = ['IRANYekan', 'Pinar-FD', 'Estedad', 'Vazir'];

  return (
    <FormControl fullWidth>
      <Select
        value={selectedFont}
        onChange={handleFontChange}
      >
        {fonts.map((font) => (
          <MenuItem key={font} value={font} style={{ fontFamily: font }}>
            <Typography style={{ fontFamily: font }}>{fontMap[font]}</Typography>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FontSelector;