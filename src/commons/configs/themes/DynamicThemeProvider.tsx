import { createTheme, ThemeProvider } from "@mui/material";
import React, { useEffect, useState } from "react";
import themeData from "../themes/themeConfig.json";
import typography from "./typography";
import { useGetWebsiteQuery } from "apps/website-display/redux/features/WebsiteSlice";

const DynamicThemeProvider = ({ children }) => {
	const [theme, setTheme] = useState(null);
	const { data: website } = useGetWebsiteQuery();

	useEffect(() => {
		const loadTheme = () => {
			themeData.fonts.forEach((font) => {
				const fontFace = new FontFace(font.fontFamily, font.src);
				fontFace.load().then(() => {
					document.fonts.add(fontFace);
				}).catch((e) => console.error('Font loading failed', e));
			});
			setTheme(createTheme({
				typography,
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
				...website.theme,
				direction: 'rtl',
			}
			));
		};
		loadTheme();
	}, [website]);
	
	if (!children || !theme) {
		return null;
	}

	return (
		<ThemeProvider theme={theme}>
			{children}
		</ThemeProvider>
	);

}

export default DynamicThemeProvider;