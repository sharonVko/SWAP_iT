import { useState, useCallback, useEffect } from "react";
import beispielfotoprofil from "../assets/userlogo.png";
import { Label } from "flowbite-react";

import { suggestions_cats, suggestions_subcats, suggestions_tags } from "../components/Categories.jsx";

import TagSelect from "../components/TagSelect.jsx";
import { useAuth } from "../context/AuthProvider.jsx";
import axios from 'axios';

const UserSettings = () => {
	const { isLoggedIn, userData } = useAuth();
	const [profile, setProfile] = useState({
		firstname: "",
		lastname: "",
		email: "",
		phone: "",
		street: "",
		number: "",
		zip: "",
		country: "",
		name: "",
		imageUrl: "",
	});
	const [isEditing, setIsEditing] = useState(false);
	const [selectedFile, setSelectedFile] = useState(null);
	const [editableField, setEditableField] = useState(null);
	const [selected, setSelected] = useState([]);

	useEffect(() => {
		if (isLoggedIn && userData) {
			setProfile((prevProfile) => ({
				...prevProfile,
				firstname: userData.firstname || "",
				lastname: userData.lastname || "",
				email: userData.email || "",
				phone: userData.phone || "",
				street: userData.address?.street || "",
				number: userData.address?.housenumber || "",
				zip: userData.address?.zip || "",
				country: userData.address?.city || "",
				name: userData.username || "",
				imageUrl: userData.profileimage || beispielfotoprofil,
			}));
		}
	}, [isLoggedIn, userData]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setProfile((prevProfile) => ({
			...prevProfile,
			[name]: value,
		}));
	};
	const handleImageChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			setSelectedFile(file);
			const reader = new FileReader();
			reader.onloadend = () => {
				setProfile((prevProfile) => ({
					...prevProfile,
					imageUrl: reader.result,
				}));
			};
			reader.readAsDataURL(file);
		}
	};
	const handleSave = async (e) => {
		e.preventDefault();

		setIsEditing(false);
		setEditableField(null);
		console.log('-->', profile);

		try {
			const response = await axios.put(`http://localhost:8000/users/${userData._id}`,
				profile,
				{
					headers: {"Content-Type": "multipart/form-data"},
					withCredentials: true,
				});

			console.log("User updated successfully:", response.data);
		}
		catch (error) {
			console.error("Error updating user:", error);
		}
		// console.log("Saved profile:", profile);
	};

	if (!isLoggedIn) {
		return <div>Please log in to access your profile.</div>;
	}

	return (
		<form onSubmit={handleSave}>
			<h1 className="mb-6 text-center">Kontoeinstellungen</h1>
			<div className="container mx-auto grid grid-cols-1 md:grid-cols-2 bg-teal-500 rounded-xl p-4 sm:p-8 md:p-12 mb-12 gap-8 md:gap-16">
				<div className="mx-auto text-center w-full">
					<div>
						<img
							src={profile.imageUrl}
							alt="Profilbild"
							className="rounded-full max-w-sm mx-auto h-29 w-40 ring-8 ring-white/50 mb-6"
						/>
						<h2 className="h2 text-peach-300 text-center text-3xl my-8">
							{profile.firstname} {profile.lastname}
						</h2>
						<label
							htmlFor="profile-image-upload"
							className="w-[200px] btn-sm btn-red py-2 block mb-3 mx-auto cursor-pointer"
						>
							Profilbild ändern
						</label>
						<input
							type="file"
							accept="image/*"
							onChange={handleImageChange}
							className="hidden"
							id="profile-image-upload"
						/>
						<button className="w-[200px] btn-sm btn-red py-2 block mx-auto">
							Passwort ändern
						</button>
					</div>

					<h2 className="h1 mt-12 text-peach-300 ">Sucheinstellungen</h2>
					<div className="w-full text-left">
						<p className="text-2xl text-green-200 mb-4 mt-8 text-center">
							Bitte wähle mindestens 3 Kategorien
						</p>
						<TagSelect suggestions={suggestions_cats} />
					</div>
					<div className="w-full text-left">
						<p className="text-2xl text-green-200 mb-4 mt-8 text-center">
							Wähle mindestens 3 Sub-Kategorien
						</p>
						<TagSelect suggestions={suggestions_subcats} />
					</div>
					<div className="w-full text-left">
						<p className="text-2xl text-green-200 mb-4 mt-8 text-center">
							Wähle mindestens 3 Tags
						</p>
						<TagSelect suggestions={suggestions_tags} />
					</div>
				</div>
				<div className=" w-full">
					<div>
						{[
							"firstname",
							"lastname",
							"email",
							"phone",
							"street",
							"number",
							"zip",
							"country",
						].map((field) => (
							<div key={field} className="mb-6">
								<div className="text-2xl text-green-200">
									{field.charAt(0).toUpperCase() + field.slice(1)}
								</div>
								<div>
									{isEditing && editableField === field ? (
										<input
											type="text"
											name={field}
											value={profile[field]}
											className="bg-peach-300 text-black text-lg rounded-lg p-4 w-full"
											onChange={handleInputChange}
											onBlur={() => setEditableField(null)}
											autoFocus
										/>
									) : (
										<div
											className="field text-black-300 border-green-200 p-4 border rounded-lg whitespace-pre-wrap cursor-pointer bg-peach-400"
											onClick={() => {
												setIsEditing(true);
												setEditableField(field);
											}}
										>
											{profile[field] || `Edit your ${field}`}
										</div>
									)}
								</div>
							</div>
						))}
					</div>
				</div>

				<div className="md:col-span-2">
					{/*{isEditing && (*/}
					<button
						type="submit"
						className="btn-md btn-red text-lemon-500 block mt-4 py-4 px-6"
					>
						Einstellungen speichern
					</button>
					{/*)}*/}
				</div>
			</div>
		</form>
	);
};

export default UserSettings;
