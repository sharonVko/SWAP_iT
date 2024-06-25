/* eslint-disable no-unused-vars */
import React from "react";

import { Link } from "react-router-dom";

const PopUpMenue = () => {
	return (
		<div>
			<div className="text-teal-700 text-4xl">PopUpMenue</div>

			<Link className="text-cyan-600" to="/">
				Home...
			</Link>

			<Link className="text-cyan-600" to="/chats">
				Chats...
			</Link>

			<Link className="text-cyan-600" to="/profile">
				Account...
			</Link>

			<Link className="text-cyan-600" to="/createad">
				Create Ad..
			</Link>

			<Link className="text-cyan-600" to="/logout">
				Logout...
			</Link>
		</div>
	);
};

export default PopUpMenue;
