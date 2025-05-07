import { createTheme, ThemeProvider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useGetPageMetadataQuery, useGetWebsiteQuery } from "apps/website-display/redux/features/WebsiteSlice";
import { fontsStyles } from "../fonts";

const DynamicThemeProvider = ({ children }) => {
	const [theme, setTheme] = useState(null);
	const { data: website } = useGetWebsiteQuery();
	const { data: pageMetadata } = useGetPageMetadataQuery({ pageAddress: window.location.pathname });

	useEffect(() => {
		const themeConfig = createTheme({
			direction: 'rtl',
			components: {
				MuiCssBaseline: {
					styleOverrides: fontsStyles,
				},
				MuiBackdrop: {
					styleOverrides: {
						root: {
							backgroundColor: 'transparent',
						},
					},
				},
			},
			...website?.theme,
			...pageMetadata?.theme,
		});
		setTheme(themeConfig);

	}, [website, pageMetadata]);

	if (theme) {
		return (
			<ThemeProvider theme={theme}>
				{children}
			</ThemeProvider>
		);
	}
};

export default DynamicThemeProvider;