import axios from 'axios';
import { useState, useCallback, useEffect } from "react";
import { useAuth } from "../context/AuthProvider.jsx";
import beispielfotoprofil from "../assets/userlogo.png";

const UserSettings = () => {

	const {isLoggedIn, userData} = useAuth();
	const [selectedFile, setSelectedFile] = useState(null);
	const [previewImage, setPreviewImage] = useState(null);
	const [profile, setProfile] = useState({
		lastname: "",
		profileimage: null,
	});

	useEffect(() => {
		if (isLoggedIn && userData) {
			setProfile((prevProfile) => ({...prevProfile,
				lastname: userData.lastname,
				profileimage: userData.profileimage,
			}));
		}
	}, [isLoggedIn, userData]);

	const handleImageChange = (e) => {
		const file = e.target.files[0]
		if (file) {
			setSelectedFile(file);
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreviewImage(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setProfile((prevProfile) => ({
			...prevProfile,
			[name]: value,
		}));
	};

	const handleSave = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('img', selectedFile);
		for(let [key, value] of Object.entries(profile)) {
			formData.append(key, value);
		}

		console.log([...formData]);

		try {
			const response = await axios.put(`http://localhost:8000/users/${userData._id}`,
				formData,
				{
					headers: {"Content-Type": "multipart/form-data"},
					withCredentials: true,
				});
			console.log("User updated successfully:", response.data);
		}
		catch (error) {
			console.error("Error updating user:", error);
		}

		//console.log("Saved profile:", profile);

	};

	if (!isLoggedIn) {
		return <div>Please log in to access your profile.</div>;
	}

	return (
		<form onSubmit={handleSave}>


					<div className="mb-6 w-40 h-40 aspect-square ring-8 ring-white/50 rounded-full relative overflow-hidden">
						<img src={previewImage ? previewImage : profile.profileimage} alt="Profilbild" className="absolute top-0 left-0 w-full h-full object-cover"/>
					</div>

					<h2 className="h2 text-peach-300 text-3xl my-8">{profile.lastname}</h2>

					<label htmlFor="profile-image-upload" className="w-[200px] btn-sm btn-red py-2 block mb-3 cursor-pointer">Profilbild ändern</label>

					<input
						name="profileimg"
						type="file"
						accept="image/*"
						onChange={handleImageChange}
						id="profile-image-upload"
					/>

					<input
						type="text"
						name="lastname"
						value={profile["lastname"]}
						onChange={handleInputChange}
					/>

					<button type="submit" className="btn-md btn-red text-lemon-500 block mt-4 py-4 px-6">Einstellungen speichern</button>

		</form>
	);
};

export default UserSettings;
