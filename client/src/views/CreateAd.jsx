/* eslint-disable no-unused-vars */
import React from "react";

import { Link } from "react-router-dom";

const CreateAd = () => {
	return (
		<div>
			<div className="text-teal-700 text-4xl">Anzeige erstellen</div>

			<Link className="text-cyan-600" to="/myads">
				Meine Anzeigen...
			</Link>

			<Link className="text-cyan-600" to="/popupmenue">
				PopUpMenue
			</Link>
		</div>
	);
};

export default CreateAd;
