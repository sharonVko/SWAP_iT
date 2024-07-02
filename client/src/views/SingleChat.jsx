import React from "react";

import { Link } from "react-router-dom";

const SingleChat = () => {
	return (
		<div>
			<div className="text-teal-700 text-4xl">Einzelner Chat</div>

			<Link className="text-cyan-600" to="/chats">
				Chatübersicht...
			</Link>

			<Link className="text-cyan-600" to="/popupmenue">
				PopUpMenue
			</Link>
		</div>
	);
};

export default SingleChat;
