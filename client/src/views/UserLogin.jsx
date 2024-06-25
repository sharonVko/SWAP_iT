import React from "react";

import { Link } from "react-router-dom";

const UserLogin = () => {
	return (
		<div>
			<div className="text-teal-700 text-4xl">Login</div>

			<Link className="text-cyan-600" to="/">
				Zurück zur Startseite.
			</Link>
		</div>
	);
};

export default UserLogin;
