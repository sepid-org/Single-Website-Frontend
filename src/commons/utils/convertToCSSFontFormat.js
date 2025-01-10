const convertCSSFont = (fonts) => {
	let fontsSting = '';
	for (let font of fonts) {
		fontsSting += `
			@font-face {
				font-family: ${font.fontFamily};
				src: ${font.src};
				font-weight: ${font.fontWeight};
				font-style: ${font.fontStyle};
			}
		`
	}
	return fontsSting;
}

export default convertCSSFont;