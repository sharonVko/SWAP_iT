import React from "react";
import { Link } from "react-router-dom";
import { Button } from "flowbite-react";

const UserLogout = () => {
	return (
		<div>
			<p>Success - User has logged out</p>
			<Link className="text-cyan-600" to="/login">
				Wieder Einloggen...
			</Link>
			<Button>Hello</Button>
			<Button
				type="button"
				class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
			>
				Default
			</Button>
		</div>
	);
};

export default UserLogout;
