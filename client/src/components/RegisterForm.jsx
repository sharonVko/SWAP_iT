import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//import { toast } from 'react-toastify';

function RegisterForm() {
	// const [firstName, setFirstName] = useState('');
	// const [lastName, setLastName] = useState('');
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [zipcode, setZipCode] = useState("");
	const [errorMsg, setErrorMsg] = useState("");

	const navigate = useNavigate();

	const handleRegister = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(
				`${import.meta.env.VITE_API_URL}/users/register/`,
				{
					// firstName,
					// lastName,
					username,
					email,
					password,
					address: {
						zip: zipcode,
					},
				},
				{ withCredentials: true }
			);

			if (response.status === 201) {
				//toast.success('Successfully registered! Welcome');
				console.log("Du hast dich erfolgreich eingeloggt");
				navigate("/login");
			}
		} catch (error) {
			// console.error(error);
			//toast.error(error.response.data.error || 'Registration failed');
			setErrorMsg(
				error.response?.data?.message ||
					"Login failed. Please check your user name and password."
			);
		}
	};

	return (
		<div className="max-w-sm mx-auto mt-10">
			<h1 className="text-center">Konto einrichten</h1>
			<div className="bg-white/30 p-8 rounded-xl">
				{errorMsg && (
					<div className="mb-4 bg-red-400 text-white text-center p-4 rounded">
						{errorMsg}
					</div>
				)}
				<form onSubmit={handleRegister}>
					<div className="mb-4">
						<label className="block mb-2 text-sm uppercase tracking-wider">
							Benutzername:
						</label>
						<input
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							className="form-input"
							required
						/>
					</div>

					<div className="mb-4">
						<label className="block mb-2 text-sm uppercase tracking-wider">
							E-Mail:
						</label>
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="form-input"
							required
						/>
					</div>

					<div className="mb-4">
						<label className="block mb-2 text-sm uppercase tracking-wider">
							Passwort:
						</label>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="form-input"
							required
						/>
						{/* validation */}
					</div>

					<div className="mb-4">
						<label className="block mb-2 text-sm uppercase tracking-wider">
							PLZ:
						</label>
						<input
							type="text"
							value={zipcode}
							onChange={(e) => setZipCode(e.target.value)}
							className="form-input"
							required
						/>
					</div>

					<div className="mt-4 text-center">
						<input
							id="link-checkbox"
							type="checkbox"
							className="form-checkbox h-5 w-5 text-teal-500 border-teal-600 focus:ring-teal-500"
						/>
						<label
							htmlFor="link-checkbox"
							className="ms-2 text-xs font-medium text-gray-900 dark:text-gray-300"
						>
							Ich akzeptiere die{" "}
							<a href="#" className="text-teal-500 hover:underline">
								AGBs{" "}
							</a>
							und{" "}
							<a href="#" className="text-teal-500 hover:underline">
								Datenschutzerklärung
							</a>
						</label>
					</div>

					<div className="flex justify-center">
						<button type="submit" className="btn-teal btn-lg mt-4 px-8">
							Anmelden
						</button>
					</div>
				</form>
			</div>
			<p className="mt-4 text-center">
				Konto schon vorhanden? <Link to="/login">Hier einloggen</Link>
			</p>
		</div>
	);
}

export default RegisterForm;
