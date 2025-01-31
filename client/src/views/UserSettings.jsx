import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider.jsx";
import { UseContextStore } from "../context/ContextProvider.jsx";
import TagSelect from "../components/TagSelect.jsx";
import Modal from "../components/Modal.jsx";
import PasswordChange from "../components/PasswordChange.jsx";
import beispielfotoprofil from "../assets/userlogo.png";
import axios from 'axios';
import { suggestions_cats, suggestions_subcats } from "../utils/categories.js"
import { suggestions_tags } from "../utils/tags.js"
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const UserSettings = () =>
{

	const { isLoggedIn, userData } = useAuth();
	const { selectedCats, selectedSubCats, selectedTags } = UseContextStore();
	const [showPWChange, setShowPWChange] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [selectedFile, setSelectedFile] = useState(null);
	const [editableField, setEditableField] = useState(null);
	const [previewImage, setPreviewImage] = useState(null);
	const [profile, setProfile] = useState({
		street: userData.address?.street || "",
		housenumber: userData.address?.housenumber || "",
		zip: userData.address?.zip || "",
		city: userData.address?.city || "",
		country: userData.address?.country || "",
		firstname: userData.firstname || "",
		lastname: userData.lastname || "",
		email: userData.email || "",
		phone: userData.phone || "",
		name: userData.username || "",
		preferredcats: userData.preferredcats || "",
		preferredSubcats: userData.preferredSubcats || "",
		preferredtags: userData.preferredtags || "",
		profileimage: userData.profileimage || beispielfotoprofil
	});

	useEffect(() =>
	{
		if (isLoggedIn && userData)
		{
			setProfile((prevProfile) => ({
				...prevProfile,
				street: userData.address?.street || "",
				housenumber: userData.address?.housenumber || "",
				zip: userData.address?.zip || "",
				city: userData.address?.city || "",
				country: userData.address?.country || "",
				firstname: userData.firstname || "",
				lastname: userData.lastname || "",
				email: userData.email || "",
				phone: userData.phone || "",
				name: userData.username || "",
				preferredcats: userData.preferredcats || "",
				preferredSubcats: userData.preferredSubcats || "",
				preferredtags: userData.preferredtags || "",
				profileimage: userData.profileimage || beispielfotoprofil
			}));
		}
	}, [isLoggedIn, userData]);

	const handleInputChange = (e) =>
	{
		const { name, value } = e.target;
		setProfile((prevProfile) => ({
			...prevProfile,
			[name]: value,
		}));
	};

	const handleImageChange = (e) =>
	{
		const file = e.target.files[0]
		if (file)
		{
			setSelectedFile(file);
			const reader = new FileReader();
			reader.onloadend = () =>
			{
				setPreviewImage(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	const openPasswordChange = (e) =>
	{
		e.preventDefault();
		setShowPWChange(true);
	};

	const handleSave = async (e) =>
	{
		e.preventDefault();
		setIsEditing(false);
		setEditableField(null);

		const formData = new FormData();
		formData.append('img', selectedFile);
		formData.append('firstname', profile.firstname);
		formData.append('lastname', profile.lastname);
		formData.append('email', profile.email);
		formData.append('phone', profile.phone);
		formData.append('name', profile.name);
		formData.append('address[street]', profile.street);
		formData.append('address[housenumber]', profile.housenumber);
		formData.append('address[zip]', profile.zip);
		formData.append('address[city]', profile.city);
		formData.append('address[country]', profile.country);
		formData.append('preferredcats', selectedCats);
		formData.append('preferredSubcats', selectedSubCats);
		formData.append('preferredtags', selectedTags);

		try
		{
			const response = await axios.put(
				`${import.meta.env.VITE_API_URL}/users/${userData._id}`,
				formData,
				{
					headers: { "Content-Type": "multipart/form-data" },
					withCredentials: true,
				});
			console.log("User updated successfully:", response.data);
			toast.success("User updated successfully");
		} catch (error)
		{
			console.error("Error updating user:", error);
			toast.error("Error updating user. Check console for details.");
		}
	};

	if (!isLoggedIn)
	{
		return <div>Please log in to access your profile.</div>;
		// toast.error("Please log in to access your profile.")
	}

	return (
		<>
			<ToastContainer />
			<form onSubmit={handleSave} id="formSettings">
				<h1 className="mb-6 text-center">Kontoeinstellungen</h1>
				<div className="container mx-auto grid grid-cols-1 md:grid-cols-2 bg-teal-500 rounded-xl p-4 sm:p-8 md:p-12 mb-12 gap-8 md:gap-16">

					<div className="mx-auto text-center w-full">
						<div>

							<div className="mx-auto mb-6 w-40 h-40 aspect-square ring-8 ring-white/50 rounded-full relative overflow-hidden">
								<img src={previewImage ? previewImage : profile.profileimage} alt="Profilbild" className="absolute top-0 left-0 w-full h-full object-cover" />
							</div>

							<h2 className="h2 text-peach-300 text-center text-3xl my-8">
								{profile.firstname} {profile.lastname}
							</h2>

							<label
								htmlFor="profile-image-upload"
								className="w-[200px] btn-sm btn-red py-2 block mb-3 mx-auto cursor-pointer hover:bg-red-500"
							>
								Profilbild ändern
							</label>

							<input
								name="profileimg"
								type="file"
								accept="image/*"
								onChange={handleImageChange}
								id="profile-image-upload"
								className="hidden"
							/>

							<button className="w-[200px] btn-sm btn-red py-2 block mx-auto hover:bg-red-500" onClick={openPasswordChange}>
								Passwort ändern
							</button>
						</div>

						<h2 className="h1 mt-12 text-peach-300 ">Sucheinstellungen</h2>
						<div className="w-full text-left">
							<p className="text-2xl text-green-200 mb-4 mt-8 text-center">
								Bitte wähle mindestens 3 Kategorien
							</p>
							<TagSelect suggestions={suggestions_cats} type="cats" preferred={userData.preferredcats} />

						</div>
						<div className="w-full text-left">
							<p className="text-2xl text-green-200 mb-4 mt-8 text-center">
								Wähle mindestens 3 Sub-Kategorien
							</p>
							<TagSelect suggestions={suggestions_subcats} type="subcats" preferred={userData.preferredSubcats} />
						</div>
						<div className="w-full text-left">
							<p className="text-2xl text-green-200 mb-4 mt-8 text-center">
								Wähle mindestens 3 Tags
							</p>
							<TagSelect suggestions={suggestions_tags} type="tags" preferred={userData.preferredtags} />
						</div>
					</div>

					<div className=" w-full">
						{[
							"firstname",
							"lastname",
							"email",
							"phone",
							"street",
							"housenumber",
							"city",
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
											onClick={() =>
											{
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
					<div className="md:col-span-2">
						<button
							type="submit"
							className="btn-md btn-red text-lemon-500 block mt-4 py-4 px-6 hover:bg-red-500"
							form="formSettings"
						>
							Einstellungen speichern
						</button>
					</div>

				</div>
			</form>

			{showPWChange && (
				<Modal setShowModal={setShowPWChange}>
					<PasswordChange setShowPWChange={setShowPWChange} />
				</Modal>
			)}

		</>

	);
};

export default UserSettings;
