import React from "react";
import UserInfo from "../template/UserInfo";
import FullScreenBackgroundImage from "../components/molecules/FullScreenBackgroundImage";
import { ImageUrls } from "../constants/imageUrls";


export default function Profile() {

	return (
		<FullScreenBackgroundImage image={ImageUrls.WALL}>
			<UserInfo />
		</FullScreenBackgroundImage>
	);
}