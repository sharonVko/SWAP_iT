// eslint-disable-next-line no-unused-vars
import React from "react";

import { Link } from "react-router-dom";

const Home = () => {
	return (
		<div>
			<div className="text-teal-700 text-4xl">Home</div>
			<Link className="text-cyan-600" to="hps">
				Header mit Searchbar...
			</Link>
			<Link className="text-cyan-600" to="/popupmenue">
				PopUpMenue...
			</Link>
			<Link className="text-cyan-600" to="/ads">
				Auf Produkt klicken..
			</Link>
			Carousel Footer
		</div>
	);
};

export default Home;
