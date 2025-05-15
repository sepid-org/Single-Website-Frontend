import React, { useEffect, useState, ReactNode } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useGetPageMetadataQuery, useGetWebsiteQuery } from "apps/website-display/redux/features/WebsiteSlice";
import { fontsStyles } from "../fonts";

interface DynamicThemeProviderProps {
	children: ReactNode;
}

const DynamicThemeProvider = ({ children }: DynamicThemeProviderProps) => {
	const [theme, setTheme] = useState<ReturnType<typeof createTheme> | null>(null);
	const { data: website } = useGetWebsiteQuery();
	const { data: pageMetadata } = useGetPageMetadataQuery({
		pageAddress: window.location.pathname,
	});

	useEffect(() => {
		const mergedTheme = createTheme(
			website?.theme ?? {},
			pageMetadata?.theme ?? {},
			{
				direction: "rtl",
				components: {
					MuiCssBaseline: {
						styleOverrides: fontsStyles,
					},
				},
			}
		);
		setTheme(mergedTheme);
	}, [website, pageMetadata]);

	if (!theme) return null;

	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default DynamicThemeProvider;