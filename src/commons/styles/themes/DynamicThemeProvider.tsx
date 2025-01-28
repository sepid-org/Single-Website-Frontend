import { createTheme, ThemeProvider } from "@mui/material";
import React, { useEffect, useState } from "react";
import defaultTheme from "commons/styles/themes/defaultTheme.json";
import { useGetWebsiteQuery } from "apps/website-display/redux/features/WebsiteSlice";
import { fontsStyles } from "../fonts";

const DynamicThemeProvider = ({ children }) => {
	const [theme, setTheme] = useState(null);
	const { data: website } = useGetWebsiteQuery();

	useEffect(() => {
		const themeConfig = createTheme({
			direction: 'rtl',
			components: {
				MuiCssBaseline: {
					styleOverrides: fontsStyles.toString(),
				}
			},
			...defaultTheme,
			...website.theme,
		});
		setTheme(themeConfig);

	}, [website]);

	if (theme) {
		return (
			<ThemeProvider theme={theme}>
				{children}
			</ThemeProvider>
		);
	}
};

export default DynamicThemeProvider;