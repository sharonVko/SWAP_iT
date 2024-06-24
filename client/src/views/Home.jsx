import React from "react";

import { Link } from "react-router-dom";

const Home = () => {
	return (
		<div>
			<h1>Home</h1>
			<Link to="/UserProfile">UserProfile</Link>

			<div>
				<Link to="/Chat">Chat</Link>
			</div>
		</div>
	);
};

export default Home;
