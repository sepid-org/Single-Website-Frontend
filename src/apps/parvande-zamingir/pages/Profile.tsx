import React from "react";
import FullScreenBackgroundImage from "commons/components/molecules/FullScreenBackgroundImage";
import { MediaUrls } from "../constants/mediaUrls";
import UserInfo from "../templates/UserInfo";


export default function Profile() {

	return (
		<FullScreenBackgroundImage image={MediaUrls.BACKGROUND2}>
			<UserInfo />
		</FullScreenBackgroundImage>
	);
}