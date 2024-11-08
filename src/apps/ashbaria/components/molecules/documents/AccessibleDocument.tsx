import React from "react";
import { Stack, Typography } from "@mui/material";
import DocumentIcon from "../../atoms/icons/Document";


const AccessibleDocument = () => {
	return (
		<Stack
			height={160}
			alignItems={'center'}
			justifyContent={'center'}
			borderRadius={2}
			paddingY={1.5}
			paddingX={1}
			sx={{
				boxShadow: "0px 2px 6px 0px #0000001A",
				backgroundColor: "#00000066"
			}}
		>
			<DocumentIcon size={72} />
			<Typography fontSize={16} fontWeight={400} color={'#FFA800'} textAlign={'center'}>
				{'مکالمات چپق‌فروشان'}
			</Typography>
		</Stack>
	)
}

export default AccessibleDocument;
