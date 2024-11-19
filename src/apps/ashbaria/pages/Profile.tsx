import React from "react";
import UserInfo from "../template/UserInfo";
import FullScreenBackgroundImage from "../components/molecules/FullScreenBackgroundImage";
import { MediaUrls } from "../constants/mediaUrls";


export default function Profile() {

	return (
		<FullScreenBackgroundImage image={MediaUrls.WALL}>
			<UserInfo />
		</FullScreenBackgroundImage>
	);
}