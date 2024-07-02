import React from "react";
import { Link } from "react-router-dom";

const UserLogout = () => {
	return (
		<div>
			<p>Success - User has logged out</p>
			<Link className="text-cyan-600" to="/login">Wieder Einloggen...</Link>
		</div>
	);
};

export default UserLogout;
