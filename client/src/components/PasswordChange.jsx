import { useState } from "react";
import axios from "axios";

function PasswordChange({ setShowPWChange }) {

	// Password change states
	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [passwordSuccess, setPasswordSuccess] = useState("");

	const handlePasswordChange = async (e) => {
		e.preventDefault();
		setPasswordError("");
		setPasswordSuccess("");

		if (newPassword !== confirmPassword) {
			setPasswordError("New password and confirm password do not match.");
			return;
		}

		try {
			const response = await axios.put(
				`${import.meta.env.VITE_API_URL}/users/change-password/`,
				{
					oldPassword,
					newPassword,
					confirmPassword,
				},
				{
					withCredentials: true,
				}
			);
			setPasswordSuccess("Password changed successfully.");
			setOldPassword("");
			setNewPassword("");
			setConfirmPassword("");
			setShowPWChange(false);
		}
		catch (error) {
			console.error("Password change error:", error);
			setPasswordError(
				error.response?.data?.message || "Error changing password."
			);
		}
	};

	return (
		<div className="mt-6">
			<h2 className="text-center mb-4 h1">Passwort ändern</h2>
			{passwordError && <div className="text-red-500 mb-4">{passwordError}</div>}
			{passwordSuccess && <div className="text-green-500 mb-4">{passwordSuccess}</div>}
			<form onSubmit={handlePasswordChange} id="formPWChange">
			<div className="mb-4">
				<label className="block text-lg mb-2">Altes Passwort</label>
				<input
					type="password"
					className="p-2 border rounded w-full text-black"
					value={oldPassword}
					onChange={(e) => setOldPassword(e.target.value)}
					required
				/>
			</div>
			<div className="mb-4">
				<label className="block text-lg mb-2">Neues Passwort</label>
				<input
					type="password"
					className="p-2 border rounded w-full text-black"
					value={newPassword}
					onChange={(e) => setNewPassword(e.target.value)}
					required
				/>
			</div>
			<div className="mb-4">
				<label className="block text-lg mb-2">Neues Passwort bestätigen</label>
				<input
					type="password"
					className="p-2 border rounded w-full text-black"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
					required
				/>
			</div>
			<button
				type="submit"
				className="block mx-auto btn-sm btn-red py-2 px-6"
				form="formPWChange"
			>
				Passwort speichern
			</button>
			</form>
		</div>
	)
}

export default PasswordChange;
