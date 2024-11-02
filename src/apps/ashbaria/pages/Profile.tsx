import React from "react";
import UserInfo from "../template/UserInfo";
import backgroundImg from "../assets/profileBackground.svg"
import FullScreenBackgroundImage from "../components/molecules/FullScreenBackgroundImage";


export default function Profile() {

	return (
		<FullScreenBackgroundImage image={backgroundImg}>
			<UserInfo />
		</FullScreenBackgroundImage>
	);
}