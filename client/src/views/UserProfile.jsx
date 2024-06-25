// import React from "react";

// import { Link } from "react-router-dom";

// const UserProfile = () => {
// 	return (
// 		<div>
// 			<div className="text-lime-300 text-9xl">UserProfile</div>
// 			<Link to="/Home">Home</Link>

// 			<div>
// 				<Link to="/Chat">Chat</Link>
// 			</div>
// 		</div>
// 	);
// };

// export default UserProfile;

import React from "react";

import { Link } from "react-router-dom";

const UserProfile = () => {
	return (
		<div>
			<div className="text-teal-700 text-4xl">UserProfile</div>
			<Link className="text-cyan-600 text-2xl" to="/popupmenue">
				PopUpMenue...
			</Link>
			<Link className="text-cyan-600 text-2xl" to="/CreateAd">
				CreateAd...
			</Link>
			<Link className="text-cyan-600 text-2xl" to="/myads">
				My Ads...
			</Link>
			Profil Bearbeiten, Filter: Das hätte ich gerne und Top 5 Matches
		</div>
	);
};

export default UserProfile;
