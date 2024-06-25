import React from "react";

import { Link } from "react-router-dom";

const UserLogout = () => {
	return (
		<div>
			<div className="text-teal-700 text-4xl">PopUpMenue</div>

			<Link className="text-cyan-600" to="/login">
				Wieder Einloggen...
			</Link>
		</div>
	);
};

export default UserLogout;
