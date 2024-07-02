// import { Link } from "react-router-dom";

// const UserProfile = () => {
// 	return (
// 		<div>
// 			<div className="text-teal-700 text-4xl">User Profile</div>
// 				- CreateAd...<br/>
// 				- My Ads...<br/>
// 				- Profil Bearbeiten, Filter: Das hätte ich gerne und Top 5 Matches<br/>
// 		</div>
// 	);
// };

// export default UserProfile;

// import React, { useState, useEffect } from "react";
// import beispielfotoprofil from "../assets/beispielfotoprofil.png";

// const UserProfile = () => {
// 	const [profile, setProfile] = useState({
// 		name: "",
// 		imageUrl: "",
// 		categories: [],
// 		subcategories: [],
// 		tags: [],
// 	});

// 	useEffect(() => {
// 		// Hier würden Sie Ihre Logik zum Abrufen der Daten aus MongoDB einfügen
// 	}, []);

// 	// Funktion zum Ändern des Profilbilds
// 	const changeProfileImage = () => {
// 		// Logik zum Ändern des Profilbilds
// 	};

// 	// Funktion zum Ändern der Favoriten
// 	const changeFavorites = () => {
// 		// Logik zum Ändern der Favoriten
// 	};

// 	return (
// 		<div className="container mx-auto  grid grid-cols-1 md:grid-cols-3 gap-2">
// 			<div className="md:col-span-1">
// 				{/* //Beispiel name löschen  */}
// 				<h1 className="text-2xl font-bold">
// 					{/*{profile.naame}*/}Beispielname
// 				</h1>
// 				<img
// 					// beispielfoto löschen und src=  {profile.imageUrl einfügen}
// 					src={beispielfotoprofil}
// 					alt="Profilbild"
// 					className="rounded-full h-28 w-28 mt-7"
// 				/>
// 				<button
// 					onClick={changeProfileImage}
// 					className="bg-blue-500 text-white px-4 py-2 rounded block mt-4"
// 				>
// 					Profilbild ändern
// 				</button>
// 			</div>
// 			<div className="md:col-span-2 flex flex-col p-10">
// 				<button className="bg-green-500 text-white px-4 py-2 rounded self-start mb-4">
// 					Account Einstellungen
// 				</button>
// 				{/* Hier würden Sie Ihre Filterlogik und die Karussellfunktion implementieren */}
// 				{/* Kategorien, Subkategorien und Tags aus MongoDB anzeigen */}
// 				<div className="flex flex-wrap gap-2">
// 					"Anzeige Kategorien"
// 					{profile.categories.map((category) => (
// 						<span className="badge">{category}</span>
// 					))}
// 				</div>
// 				<div className="flex flex-wrap gap-2">
// 					"Anzeige Subkategorien"
// 					{profile.subcategories.map((subcategory) => (
// 						<span className="badge">{subcategory}</span>
// 					))}
// 				</div>
// 				<div className="flex flex-wrap gap-2">
// 					"Anzeige tags"
// 					{profile.tags.map((tag) => (
// 						<span className="badge">{tag}</span>
// 					))}
// 				</div>
// 				<button
// 					onClick={changeFavorites}
// 					className="bg-yellow-500 text-white px-4 py-2 rounded mt-4 self-start"
// 				>
// 					Favoriten ändern
// 				</button>
// 			</div>
// 		</div>
// 	);
// };

// export default UserProfile;

// import React, { useState, useEffect } from "react";
// import beispielfotoprofil from "../assets/beispielfotoprofil.png";

// const UserProfile = () => {
// 	const [profile, setProfile] = useState({
// 		name: "Beispielname",
// 		imageUrl: beispielfotoprofil,
// 		categories: ["Kategorie 1", "Kategorie 2"],
// 		subcategories: ["Subkategorie 1", "Subkategorie 2"],
// 		tags: ["Tag 1", "Tag 2"],
// 	});
// 	const [isModalOpen, setIsModalOpen] = useState(false);

// 	useEffect(() => {
// 		// Hier würden Sie Ihre Logik zum Abrufen der Daten aus MongoDB einfügen
// 	}, []);

// 	const changeProfileImage = () => {
// 		// Logik zum Ändern des Profilbilds
// 	};

// 	const toggleModal = () => {
// 		setIsModalOpen(!isModalOpen);
// 	};

// 	return (
// 		<div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-2">
// 			<div className="md:col-span-1">
// 				<h1 className="text-2xl font-bold">{profile.name}</h1>
// 				<img
// 					src={profile.imageUrl}
// 					alt="Profilbild"
// 					className="rounded-full h-28 w-28 mt-7"
// 				/>
// 				<button
// 					onClick={changeProfileImage}
// 					className="bg-blue-500 text-white px-4 py-2 rounded block mt-4"
// 				>
// 					Profilbild ändern
// 				</button>
// 			</div>
// 			<div className="md:col-span-2 flex flex-col p-10">
// 				<button className="bg-green-500 text-white px-4 py-2 rounded self-start mb-4">
// 					Account Einstellungen
// 				</button>
// 				<div className="flex flex-wrap gap-2">
// 					{profile.categories.map((category, index) => (
// 						<span key={index} className="badge">
// 							{category}
// 						</span>
// 					))}
// 				</div>
// 				<div className="flex flex-wrap gap-2">
// 					{profile.subcategories.map((subcategory, index) => (
// 						<span key={index} className="badge">
// 							{subcategory}
// 						</span>
// 					))}
// 				</div>
// 				<div className="flex flex-wrap gap-2">
// 					{profile.tags.map((tag, index) => (
// 						<span key={index} className="badge">
// 							{tag}
// 						</span>
// 					))}
// 				</div>
// 				<button
// 					onClick={toggleModal}
// 					className="bg-yellow-500 text-white px-4 py-2 rounded mt-4 self-start"
// 				>
// 					Favoriten ändern
// 				</button>
// 			</div>

// 			{isModalOpen && (
// 				<div className="fixed inset-0 z-50 overflow-auto bg-smoke-light flex">
// 					<div className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg">
// 						<div className="flex justify-start items-center">
// 							<button onClick={toggleModal} className="text-black close-modal">
// 								<svg
// 									xmlns="http://www.w3.org/2000/svg"
// 									className="h-6 w-6"
// 									fill="none"
// 									viewBox="0 0 24 24"
// 									stroke="currentColor"
// 								>
// 									<path
// 										strokeLinecap="round"
// 										strokeLinejoin="round"
// 										strokeWidth="2"
// 										d="M6 18L18 6M6 6l12 12"
// 									/>
// 								</svg>
// 							</button>
// 						</div>
// 						{/* Modal content goes here */}
// 						<p>Hier könnte der Inhalt des Modals stehen.</p>
// 					</div>
// 				</div>
// 			)}
// 		</div>
// 	);
// };

// export default UserProfile;

// import React, { useState, useEffect } from "react";
// import beispielfotoprofil from "../assets/beispielfotoprofil.png";
// import { Label, Textarea } from "flowbite-react";

// const UserProfile = () => {
// 	// State für die Information aus Cloudinary und Bearbeitungsstatus
// 	const [firstname, setFirstname] = useState("Hier die Cloudinary-Info");
// 	const [isEditing, setIsEditing] = useState(false);

// 	// Funktion zum Bearbeiten der Information
// 	const editFirstname = (newFirstname) => {
// 		setFirstname(newFirstname);
// 		// Hier könnten Sie die aktualisierte Info zurück zu Cloudinary senden
// 	};

// 	// Funktion zum Speichern der Information
// 	const saveFirstname = () => {
// 		// Hier könnten Sie die aktualisierte Info zurück zu Cloudinary senden
// 		setIsEditing(false); // Beendet den Bearbeitungsmodus
// 	};

// 	const [profile, setProfile] = useState({
// 		name: "Beispielname",
// 		imageUrl: beispielfotoprofil,
// 		categories: ["Kategorie 1", "Kategorie 2"],
// 		subcategories: ["Subkategorie 1", "Subkategorie 2"],
// 		tags: ["Tag 1", "Tag 2"],
// 	});
// 	const [selectedFile, setSelectedFile] = useState(null);
// 	const [isModalOpen, setIsModalOpen] = useState(false);

// 	useEffect(() => {
// 		// Hier würden Sie Ihre Logik zum Abrufen der Daten aus MongoDB einfügen
// 	}, []);

// 	const handleImageChange = (event) => {
// 		const file = event.target.files[0];
// 		if (file) {
// 			setSelectedFile(file);
// 			// Optional: Setze das Bild als Vorschau
// 			const reader = new FileReader();
// 			reader.onloadend = () => {
// 				setProfile({ ...profile, imageUrl: reader.result });
// 			};
// 			reader.readAsDataURL(file);
// 		}
// 	};

// 	const uploadProfileImage = () => {
// 		if (selectedFile) {
// 			// Logik
// 			console.log("Bild hochgeladen:", selectedFile);
// 			// Zustand zurücksetzten nach Laden
// 			setSelectedFile(null);
// 		}
// 	};

// 	const toggleModal = () => {
// 		setIsModalOpen(!isModalOpen);
// 	};

import React, { useState, useEffect } from "react";
import beispielfotoprofil from "../assets/beispielfotoprofil.png";
import { Label, Textarea } from "flowbite-react";

const UserProfile = () => {
	// State
	const [firstname, setFirstname] = useState("");
	const [lastname, setLastname] = useState("");
	const [isEditing, setIsEditing] = useState(false);

	// Edit
	const editFirstname = (newFirstname) => {
		setFirstname(newFirstname);
	};

	// Funktion zum Bearbeiten des Nachnamens
	const editLastname = (newLastname) => {
		setLastname(newLastname);
	};

	// save
	const saveFirstname = () => {
		setIsEditing(false);
	};

	const saveLastname = () => {
		setIsEditing(false);
	};

	const [profile, setProfile] = useState({
		name: "Beispielname",
		imageUrl: beispielfotoprofil,
		categories: ["Kategorie 1", "Kategorie 2"],
		subcategories: ["Subkategorie 1", "Subkategorie 2"],
		tags: ["Tag 1", "Tag 2"],
	});

	const [selectedFile, setSelectedFile] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {}, []);

	const handleImageChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			setSelectedFile(file);
			// Vorschaubild
			const reader = new FileReader();
			reader.onloadend = () => {
				setProfile({ ...profile, imageUrl: reader.result });
			};
			reader.readAsDataURL(file);
		}
	};

	const uploadProfileImage = () => {
		if (selectedFile) {
			console.log("Bild hochgeladen:", selectedFile);

			setSelectedFile(null);
		}
	};

	const toggleModal = () => {
		setIsModalOpen(!isModalOpen);
	};

	return (
		<div className="container mx-auto grid grid-cols- md:grid-cols-2  bg-teal-600 bg-opacity-80 rounded-lg  ">
			{/* start container 1 */}

			<div className="max-w-sm mx-auto">
				<div Class="text-4xl pb-12 pt-6 text-peach-300 text-center">
					Profile Settings{" "}
				</div>
				{/* ------------------profile pic start-------------------- */}
				<div>
					<img
						src={profile.imageUrl}
						alt="Profilbild"
						className="rounded-full max-w-sm mx-auto h-29 w-40  border-8 border-peach-500 mb-6"
					/>
				</div>
				<input
					type="file"
					accept="image/*"
					onChange={handleImageChange}
					className="hidden"
					id="profile-image-upload"
				/>
				<label
					htmlFor="profile-image-upload"
					className=" max-w-sm mx-auto btn-sm btn-red text-lemon-500  py-2 mb-4"
				>
					Change your Pic
				</label>

				{/* ------------------name start-------------------- */}

				<h1 className=" text-2xl  text-peach-300 text-center text-3xl font-bold mt-8">
					{profile.name}
				</h1>
				{/* ------------------name end-------------------- */}

				{/* ------------------profile pic end-------------------- */}

				{/* /* ------------------change pw  start-------------------  */}
				<div className="max-w-sm mx-auto">
					<button className="bg-green-700  text-white rounded-lg border-peach-300 p-3 w-full mb-9 mt-9">
						Change your Password
					</button>
				</div>

				{/* ------------------change pw end-------------------  */}

				<form className="max-w-sm mx-auto">
					{/* ------------------Choose categories and tags start-------------------  */}
					<div className="mb-2 block  ">
						<Label
							className="text-2xl text-peach-300"
							htmlFor="categories"
							value="Select a Category"
						/>
					</div>
					<select
						id="cats"
						className="bg-red-400 border-peach-300 text-peach-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 first-letter:block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
						 dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-8"
					>
						<option className="bg-peach-300 text-black  hover:red-100">
							Shopping
						</option>
						<option className=" bg-peach-300 focus:ring-orange-500 text-black">
							Household
						</option>

						<option id className="bg-peach-300 text-black ">
							Garden
						</option>
						<option className="bg-peach-300 text-black">Sport</option>
					</select>
				</form>

				<form className="max-w-sm mx-auto">
					<div className="mb-2 block ">
						<Label
							className="text-2xl text-peach-300"
							htmlFor="categories"
							value="Select a Subcategory"
						/>
					</div>
					<select
						id="subcats"
						className="bg-red-400 border-peach-300 text-peach-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 first-letter:block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
						 dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-8"
					>
						<option className="bg-peach-300 text-black  hover:red-100">
							Shopping
						</option>
						<option className=" bg-peach-300 focus:ring-orange-500 text-black">
							Household
						</option>

						<option id className="bg-peach-300 text-black ">
							Garden
						</option>
						<option className="bg-peach-300 text-black">Sport</option>
					</select>
				</form>

				<form className="max-w-sm mx-auto">
					<div className="mb-2 block ">
						<Label
							className="text-2xl text-peach-300"
							htmlFor="categories"
							value="Select at least three Tags"
						/>
					</div>
					<select
						id="tags"
						className="bg-red-400 border-peach-300 text-peach-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 first-letter:block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
						 dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-8"
					>
						<option className="bg-peach-300 text-black  hover:red-100">
							Shopping
						</option>
						<option className=" bg-peach-300 focus:ring-orange-500 text-black">
							Household
						</option>

						<option id className="bg-peach-300 text-black ">
							Garden
						</option>
						<option className="bg-peach-300 text-black">Sport</option>
					</select>
				</form>
			</div>
			{/* ------------------Choose categories and tags end------------------  */}

			<div className="md:col-span-1 p-12 flex flex-col ">
				<div>
					{/* ------------------change user information start------------------*/}
					{/* -------change first name start------------ */}
					<div className="text-2xl text-green-200"> First Name</div>
					<div>
						{isEditing ? (
							// inputfield when edit mode
							<input
								type="text"
								value={firstname}
								className="bg-peach-300 text-black text-lg rounded-lg p-4"
								onChange={(e) => setFirstname(e.target.value)}
							/>
						) : (
							// Text display when not in edit mode
							<div className="field text-peach-300 border-green-200 p-4 border rounded-lg  whitespace-pre-wrap">
								{firstname}
							</div>
						)}
					</div>

					{isEditing ? (
						// Speichern-Button, wenn im Bearbeitungsmodus
						<button
							className="btn-sm btn-red text-lemon-500 px-4 py-2 rounded block mt-4"
							onClick={saveLastname}
						>
							Speichern
						</button>
					) : (
						// Edit-Button, wenn nicht im Bearbeitungsmodus
						<button
							className="btn-sm btn-red text-lemon-500 px-4 py-2 rounded block mt-4"
							onClick={() => setIsEditing(true)}
						>
							Edit
						</button>
					)}

					{/* -------change first name end----------- */}

					{/* -------change last name start----------- */}

					<div className="text-2xl text-green-200 pt-6"> Last Name</div>
					<div>
						{isEditing ? (
							// Input field when in edit mode
							<input
								type="text"
								value={firstname}
								className="bg-peach-300 text-black text-lg rounded-lg p-4"
								onChange={(e) => Lastname(e.target.value)}
							/>
						) : (
							// Text display when not in edit mode
							<div className="field text-peach-300 border-green-200 p-4 border rounded-lg w-full">
								{lastname}
							</div>
						)}

						{isEditing ? (
							// Speichern-Button, wenn im Bearbeitungsmodus
							<button
								className="btn-sm btn-red text-lemon-500 px-4 py-2 rounded block mt-4"
								onClick={saveLastname}
							>
								Speichern
							</button>
						) : (
							// Edit-Button, wenn nicht im Bearbeitungsmodus
							<button
								className="btn-sm btn-red text-lemon-500 px-4 py-2 rounded block mt-4"
								onClick={() => setIsEditing(true)}
							>
								Edit
							</button>
						)}

						{/* -------change last name end----------- */}

						{/* -------change email start------------ */}
						<div className="text-2xl text-green-200 pt-6"> E-Mail Adress</div>
						<div>
							{isEditing ? (
								// inputfield when edit mode
								<input
									type="text"
									value={firstname}
									className="bg-peach-300 text-black text-lg rounded-lg p-4"
									onChange={(e) => setFirstname(e.target.value)}
								/>
							) : (
								// Text display when not in edit mode
								<div className="field text-peach-300 border-green-200 p-4 border rounded-lg  whitespace-pre-wrap">
									{firstname}
								</div>
							)}
						</div>

						{isEditing ? (
							// Speichern-Button, wenn im Bearbeitungsmodus
							<button
								className="btn-sm btn-red text-lemon-500 px-4 py-2 rounded block mt-4"
								onClick={saveLastname}
							>
								Speichern
							</button>
						) : (
							// Edit-Button, wenn nicht im Bearbeitungsmodus
							<button
								className="btn-sm btn-red text-lemon-500 px-4 py-2 rounded block mt-4"
								onClick={() => setIsEditing(true)}
							>
								Edit
							</button>
						)}

						{/* -------change email end----------- */}

						{/* Telephonnumber start */}

						<div className="text-2xl text-green-200 pt-6"> Telephonnumber</div>
						<div>
							{isEditing ? (
								// inputfield when edit mode
								<input
									type="text"
									value={firstname}
									className="bg-peach-300 text-black text-lg rounded-lg p-4"
									onChange={(e) => setFirstname(e.target.value)}
								/>
							) : (
								// Text display when not in edit mode
								<div className="field text-peach-300 border-green-200 p-4 border rounded-lg  whitespace-pre-wrap">
									{firstname}
								</div>
							)}
						</div>

						{/* Telephonnumber end */}

						{/* -------change street start----------- */}

						<div className="flex flex-wrap -mx-3">
							<div className="w-full md:w-3/4 px-3 mb-6 md:mb-0">
								<div className="text-2xl text-green-200 pt-6"> Street</div>
								<div>
									{isEditing ? (
										// inputfield when edit mode
										<input
											type="text"
											value={firstname}
											className="bg-peach-300 text-black text-lg rounded-lg p-4"
											onChange={(e) => setFirstname(e.target.value)}
										/>
									) : (
										// Text display when not in edit mode
										<div className="field text-peach-300 border-green-200 p-4 border rounded-lg  whitespace-pre-wrap">
											{firstname}
										</div>
									)}
								</div>
							</div>

							{/* -------change street end----------- */}
							{/* -------change number start----------- */}
							<div className="w-full md:w-1/4 px-3">
								<div className="text-2xl text-green-200 pt-6"> Number</div>
								<div>
									{isEditing ? (
										// inputfield when edit mode
										<input
											type="text"
											value={firstname}
											className="bg-peach-300 text-black text-lg rounded-lg p-4"
											onChange={(e) => setFirstname(e.target.value)}
										/>
									) : (
										// Text display when not in edit mode
										<div className="field text-peach-300 border-green-200 p-4 border rounded-lg  whitespace-pre-wrap">
											{firstname}
										</div>
									)}
								</div>
							</div>
						</div>

						{isEditing ? (
							// Speichern-Button, wenn im Bearbeitungsmodus
							<button
								className="btn-sm btn-red text-lemon-500 px-4 py-2 rounded block mt-4"
								onClick={saveLastname}
							>
								Speichern
							</button>
						) : (
							// Edit-Button, wenn nicht im Bearbeitungsmodus
							<button
								className="btn-sm btn-red text-lemon-500 px-4 py-2 rounded block mt-4"
								onClick={() => setIsEditing(true)}
							>
								Edit
							</button>
						)}

						{/* -------change number end----------- */}

						{/* ----------Buttons--------- */}
						{isEditing ? (
							// Speichern-Button, wenn im Bearbeitungsmodus
							<button
								className="btn-sm btn-red text-lemon-500 px-4 py-2 rounded block mt-4"
								onClick={saveLastname}
							>
								Speichern
							</button>
						) : (
							// Edit-Button, wenn nicht im Bearbeitungsmodus
							<button
								className="btn-sm btn-red text-lemon-500 px-4 py-2 rounded block mt-4"
								onClick={() => setIsEditing(true)}
							>
								Edit
							</button>
						)}

						{/* lastname end */}
					</div>
				</div>

				{/* ---------------change personal info end------------------- */}
			</div>

			{/* container2 start */}
		</div>
	);
};

export default UserProfile;
