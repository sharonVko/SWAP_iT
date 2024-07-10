import React from "react";
import { Link } from "react-router-dom";

const UserLogout = () => {
	return (
		<div className="max-w-sm mx-auto mt-10">
			<h1 className="mb-6 text-center">Logout</h1>
			<div className="bg-white/30 p-8 rounded-xl text-center">
				<p className="text-lg mb-12">Du hast dich erfolgreich abgemeldet.</p>
				<Link className="text-cyan-600 text-md btn-teal btn-md inline-block hover:no-underline" to="/login">Wieder einloggen</Link>
			</div>
		</div>
	);
};

export default UserLogout;
