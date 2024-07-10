import React, {useState} from "react";
import LoginForm from "../components/LoginForm.jsx";

const FilteredAds = ({ filter }) => {
	const { isLoggedIn, userData } = useAuth();

	return (
		<>
			{!isLoggedIn ? (
				<LoginForm target="/" />
			) : (
				<>
					<div>Filtered Ads</div>
				</>
			)};
		</>
	);
};

export default FilteredAds;
