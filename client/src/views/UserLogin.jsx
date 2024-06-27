import React, { useState } from "react";

const UserLogin = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Anmelde-Logik hier
		console.log(formData);
	};

	return (
		<div className="m-20">
			<div className="p-10 max-w-sm mx-auto bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>Hello Friend!</div>
					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium text-gray-700"
						>
							<div className="mb-2">E-Mail</div>
						</label>
						<input
							type="email"
							name="email"
							id="email"
							required
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
							placeholder="Enter your e-mail adress"
							onChange={handleChange}
						/>
					</div>
					<div>
						<label
							htmlFor="passwort"
							className="block text-sm font-medium text-gray-700"
						>
							<div className="mb-2">Password</div>
						</label>
						<input
							type="password"
							name="passwort"
							id="passwort"
							required
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
							placeholder="Enter your password"
							onChange={handleChange}
						/>
					</div>
					<button
						type="submit"
						className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
					>
						Login
					</button>
					<div>Forget password?</div>
					<div>You don't have an account? Register now!</div>
				</form>
			</div>
		</div>
	);
};

export default UserLogin;
