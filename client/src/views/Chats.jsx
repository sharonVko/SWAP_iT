/* eslint-disable no-unused-vars */
import React from "react";

import { Link } from "react-router-dom";

const Chats = () => {
	return (
		<div>
			<div className="text-teal-700 text-4xl">Chats</div>

			<Link className="text-cyan-600" to="/singlechat">
				Einzelner Chat...
			</Link>

			<Link className="text-cyan-600" to="/popupmenue">
				PopUpMenue...
			</Link>
		</div>
	);
};

export default Chats;
