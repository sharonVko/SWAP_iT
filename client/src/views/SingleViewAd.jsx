import React from "react";

import { Link } from "react-router-dom";

const SingleViewAd = () => {
	return (
		<div>
			<div className="text-teal-700 text-4xl">Produkt</div>
			<Link className="text-cyan-600 text-2xl" to="/chats">
				Kontakt Aufnehmen...
			</Link>
			<Link className="text-cyan-600 text-2xl" to="popupmenue">
				PopUpMenue...
			</Link>
			Leaflet..Category..Tags
		</div>
	);
};

export default SingleViewAd;
