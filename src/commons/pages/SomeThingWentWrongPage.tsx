import { Box, Button, Container, Stack, Typography } from "@mui/material";
import React from "react";
import SyncIcon from '@mui/icons-material/Sync';
import errorImg from "../components/atoms/icons/errorImg2.png";

const SomeThingWentWrong = () => {
	return (
		<Container
			sx={{
				width: "100vw",
				height: "100vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				flexDirection: { sm: "row", xs: "column" }
			}}
		>
			<Box
				component="img"
				src={errorImg}
				width={{ xs: 200, sm: 400 }}
				height={{ xs: 200, sm: 400 }}
			/>
			<Stack
				sx={{
					display: "flex",
					alignItems: "flex-start",
					flexDirection: "column",
				}}
				spacing={3}
			>
				<Typography
					fontWeight={30}
					fontSize={{ xs: 20, md: 30 }}
					color={"#3b4573"}
					fontFamily={"iranyekan"}
				>
					{"یه مشکلی پیش اومده!"}
				</Typography>
				<Typography
					fontWeight={30}
					fontSize={{ xs: 10, md: 15 }}
					color={"#3b4573"}
					fontFamily={"iranyekan"}
				>
					{"لطفا صفحه رو از اول بارگذاری کن."}
				</Typography>
				<Button
					onClick={() => window.location.reload()}
					endIcon={<SyncIcon />}
					variant='outlined'
					size='small'
					sx={{
						borderColor: "#9fa9cf",
						color: "#3b4573",
					}}
				>
					{"بارگذاری مجدد"}
				</Button>
			</Stack>
		</Container>
	);
}

export default SomeThingWentWrong;