import React from "react";

import { Link } from "react-router-dom";

const HeaderPlusSearchBar = () => {
	return (
		<div>
			<div className="text-teal-700 text-4xl">Header mit Searchbar</div>
			<Link className="text-cyan-600" to="/">
				Home..
			</Link>

			<Link className="text-cyan-600" to="/popupmenue">
				PopUpMenue...
			</Link>
		</div>
	);
};

export default HeaderPlusSearchBar;
