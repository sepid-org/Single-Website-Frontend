import { createTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import themeData from "../themes/themeConfig.json";
import selectTheme from 'commons/configs/themes';
import typography from "./typography";

const DynamicThemeProvider = ({ children }) => {
	const [theme, setTheme] = useState(null);
	const theme2 = selectTheme('rtl');
	useEffect(() => {
		const loadTheme = () => {
			themeData.fonts.forEach((font) => {
				const fontFace = new FontFace(font.fontFamily, font.src);
				fontFace.load().then(() => {
					document.fonts.add(fontFace);
				}).catch((e) => console.error('Font loading failed', e));
			});
			setTheme(createTheme({
				...themeData,
				components: {
					MuiCssBaseline: {
						styleOverrides: {
							'@font-face': themeData.fonts.map(font => ({
								fontFamily: font.fontFamily,
								fontStyle: font.fontStyle,
								src: font.src
							}))
						}
					}
				},
				typography,
				direction: 'rtl'
			}
			));
		};
		loadTheme();
	}, []);
	console.log("theme2: ", theme2);
	console.log(children);
	if(!children){
		return null;
	}
	console.log(theme)
	return <ThemeProvider theme={selectTheme('rtl')}>{children}</ThemeProvider>;

}

export default DynamicThemeProvider;