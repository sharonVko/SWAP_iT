import React from "react";

import { Link } from "react-router-dom";

const UserProfile = () => {
	return (
		<div>
			<div className="text-lime-300 text-9xl">UserProfile</div>
			<Link to="/UserProfile">UserProfile</Link>

			<div>
				<Link to="/Chat">Chat</Link>
			</div>
		</div>
	);
};

export default UserProfile;
