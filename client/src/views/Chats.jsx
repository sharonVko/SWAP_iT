/* eslint-disable no-unused-vars */
import React from "react";

import { Link } from "react-router-dom";

const Chats = () => {
	return (
		<div>
			<div className="text-teal-700 text-4xl">Chat-Übersicht</div>
			<div><Link className="text-cyan-600 text-2xl" to="/singlechat">Einzelner Chat1</Link></div>
			<div><Link className="text-cyan-600 text-2xl" to="/singlechat">Einzelner Chat2</Link></div>
		</div>
	);
};

export default Chats;
