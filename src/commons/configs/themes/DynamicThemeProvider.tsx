import { createTheme, ThemeProvider } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import themeData from "commons/configs/themes/themeConfig.json";
import { useGetWebsiteQuery } from "apps/website-display/redux/features/WebsiteSlice";
import convertCSSFont from "commons/utils/convertToCSSFontFormat";

const DynamicThemeProvider = ({ children }) => {
	const [theme, setTheme] = useState(null);
	const { data: website } = useGetWebsiteQuery();

	useEffect(() => {
		const themeConfig = createTheme({
			components: {
				MuiCssBaseline: {
					styleOverrides: website.theme.hasOwnProperty('fonts') ? convertCSSFont(website.theme['font']) : convertCSSFont(themeData.fonts)
				}
			},
			...themeData,
			...website.theme,
			direction: 'rtl',
		});
		setTheme(themeConfig);

	}, [website]);

	if (theme === null || !children) {
		return null;
	}

	return (
		<ThemeProvider theme={theme}>
			{children}
		</ThemeProvider>
	);
};

export default DynamicThemeProvider;