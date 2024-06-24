import React from "react";

import { Link } from "react-router-dom";

const Home = () => {
	return (
		<div>
			<div className="text-lime-300 text-9xl">Home</div>
			<Link to="/UserProfile">UserProfile</Link>

			<div>
				<Link to="/Chat">Chat</Link>
			</div>
		</div>
	);
};

export default Home;
