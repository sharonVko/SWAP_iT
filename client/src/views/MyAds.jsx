import React from "react";

import { Link } from "react-router-dom";

const MyAds = () => {
	return (
		<div>
			<div className="text-teal-700 text-4xl">My Ads</div>

			<Link className="text-cyan-600 text-2xl" to="/popupmenue">
				PopUpMenue...
			</Link>
		</div>
	);
};

export default MyAds;
