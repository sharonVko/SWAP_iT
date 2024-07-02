// import React, { useState } from "react";

// const UserLogin = () => {
// 	const [formData, setFormData] = useState({
// 		email: "",
// 		password: "",
// 	});

// 	const handleChange = (e) => {
// 		setFormData({ ...formData, [e.target.name]: e.target.value });
// 	};

// 	const handleSubmit = (e) => {
// 		e.preventDefault();
// 		// Anmelde-Logik hier
// 		console.log(formData);
// 	};

// 	return (
// 		<div className="m-20">
// 			<div className="p-10 max-w-sm mx-auto bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
// 				<form onSubmit={handleSubmit} className="space-y-4">
// 					<div>Hello Friend!</div>
// 					<div>
// 						<label
// 							htmlFor="email"
// 							className="block text-sm font-medium text-gray-700"
// 						>
// 							<div className="mb-2">E-Mail</div>
// 						</label>
// 						<input
// 							type="email"
// 							name="email"
// 							id="email"
// 							required
// 							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
// 							placeholder="Enter your e-mail adress"
// 							onChange={handleChange}
// 						/>
// 					</div>
// 					<div>
// 						<label
// 							htmlFor="passwort"
// 							className="block text-sm font-medium text-gray-700"
// 						>
// 							<div className="mb-2">Password</div>
// 						</label>
// 						<input
// 							type="password"
// 							name="passwort"
// 							id="passwort"
// 							required
// 							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
// 							placeholder="Enter your password"
// 							onChange={handleChange}
// 						/>
// 					</div>
// 					<button
// 						type="submit"
// 						className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
// 					>
// 						Login
// 					</button>
// 					<div>Forget password?</div>
// 					<div>You don't have an account? Register now!</div>
// 				</form>
// 			</div>
// 		</div>
// 	);
// };

// export default UserLogin;

// --------------------------------------

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import { toast } from "react-toastify";
function UserLogin() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const { setIsLoggedIn, checkUser } = useAuth();
	const navigate = useNavigate();
	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(
				"http://localhost:8000/users/login",
				{
					email,
					password,
				},
				{ withCredentials: true }
			);
			if (response.status === 200) {
				setIsLoggedIn(true);
				checkUser();
				// toast.info('Logged in');
				navigate("/");
			}
		} catch (error) {
			setError(error.response.data.error || "Something went wrong");
		}
	};
	return (
		<div className="container mt-8 mx-auto max-w-md rounded-xl shadow-xl shadow-gray-500">
			<div className="p-4">
				<h2 className="text-2xl font-semibold mb-4">Login</h2>
				{error && <p className="text-red-500 mb-4">{error}</p>}
				<form onSubmit={handleLogin}>
					<div className="mb-4">
						<label className="block mb-2">Email:</label>
						<input
							type="text"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							className="border rounded w-full p-2"
						/>
					</div>
					<div className="mb-4">
						<label className="block mb-2">Password:</label>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							className="border rounded w-full p-2"
						/>
					</div>
					<button type="submit" className="bg-blue-500 rounded text-white p-2">
						Login
					</button>
				</form>
				<p className="mt-4">
					Not registered yet?{" "}
					<Link to="/register" className="text-blue-500 underline">
						Register here
					</Link>
				</p>
			</div>
		</div>
	);
}
export default UserLogin;
