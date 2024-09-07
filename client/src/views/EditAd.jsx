import React, { useState, useEffect } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { UseContextStore } from "../context/ContextProvider.jsx";
import { useAuth } from "../context/AuthProvider.jsx";
import LoginForm from "../components/LoginForm.jsx";
import Uploader from "../components/Uploader.jsx";
import Gallery from "../components/Gallery.jsx";
import axios from 'axios';
import Switch from "react-switch";
import { categories } from "../utils/categories.js";
import { tags } from "../utils/tags";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



const EditAd = () => {
	const { isLoggedIn, userData } = useAuth();
	const { adid } = useParams();
	const navigate = useNavigate();

	// get updated image array as context variable
	const { updatedImages } = UseContextStore();

	// define state vars
	const [adData, setAdData] = useState({
			title: "",
			description: "",
			tradeOption: true,
			pickupaddress: {
				street: "",
				housenumber: "",
				zip: "",
				city: "",
				country: "",
			},
			categories: "",
			subCategory: "",
			tags: "",
			media: [],
		  media_files: [],
			condition: "",
			material: "",
			color: "",
			diverse: "",
		});
	const [loading, setLoading] = useState(true);
	const [openDropzone, setOpenDropzone] = useState(false);
	const [dropImages, setDropImages] = useState([]);
	const [expandAddress, setExpandAddress] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState("");
	const [selectedSubCategory, setSelectedSubCategory] = useState("");
	const [selectedCondition, setSelectedCondition] = useState("");
	const [selectedMaterial, setSelectedMaterial] = useState("");
	const [selectedColor, setSelectedColor] = useState("");
	const [selectedDiverse, setSelectedDiverse] = useState("");
	const [subCategories, setSubCategories] = useState([]);

	// filter pre-defined categories and tags by certain IDs
	const filteredCategories = categories.filter(category => category.parent === 0);
	const conditionTags = tags.filter(tag => tag.parent === 1);
	const materialTags = tags.filter(tag => tag.parent === 9);
	const colorTags = tags.filter(tag => tag.parent === 25);
	const diverseTags = tags.filter(tag => tag.parent === 39);

	// fetch adData depending on 'adid' (url param)
	useEffect(() => {
		const fetchAdData = async () => {
			try {
				const response = await axios.get(`${import.meta.env.VITE_API_URL}/ads/${adid}`);
				const data = response.data;
				setAdData({
					title: data.title || "",
					description: data.description || "",
					tradeOption: data.tradeOption,
					pickupaddress: {
						street: data.pickupaddress?.street || "",
						housenumber: data.pickupaddress?.housenumber || "",
						zip: data.pickupaddress?.zip || "",
						city: data.pickupaddress?.city || "",
						country: data.pickupaddress?.country || "",
					},
					categories: data.categories || "",
					subCategory: data.subCategory || "",
					tags: data.tags || [],
					media: data.media || [], // Initialize as empty array or as per fetched data
					media_files: dropImages || [],
					condition: data.condition,
					material: data.material,
					color: data.color,
					diverse: data.diverse
				});

				setSelectedCategory(data.categories);
				setSelectedSubCategory(data.subCategory);
				setSelectedCondition(data.condition);
				setSelectedMaterial(data.material);
				setSelectedColor(data.color);
				setSelectedDiverse(data.diverse);

				setLoading(false);
			}
			catch (error) {
				console.error("Error fetching ad data:", error);
				setLoading(false);
			}
		};
		if (adid) fetchAdData();
	}, [adid]);

	// update adData depending on context var 'updatedImages'
	useEffect(() => {
		if (isLoggedIn && !loading) {
			if (updatedImages.length !== 0) {
				setAdData((prev) => ({
					...prev,
					media: [...updatedImages],
				}));
			}
		}
	}, [updatedImages]);

  // update adData depending on var 'dropImages' (file objects)
	useEffect(() => {
		if (dropImages) {
			setAdData((prev) => ({
				...prev,
				media_files: dropImages,
			}));
		}
	}, [dropImages]);

	// grab subcategories depening on category
	useEffect(() => {
		if (selectedCategory) {
			const filteredSubCategories = categories.filter(
				(category) => category.parent === parseInt(selectedCategory)
			);
			setSubCategories(filteredSubCategories);
		} else {
			setSubCategories([]);
		}
	}, [selectedCategory]);

	// handle change of regular form fields
	const handleChange = (e) => {
		const { name, value } = e.target;

		console.log("Field name:", name);
		console.log("Field value:", value);

		if (name.includes("pickupaddress")) {
			const [_, addressField] = name.split(".");
			setAdData((prev) => ({
				...prev,
				pickupaddress: {
					...prev.pickupaddress,
					[addressField]: value,
				},
			}));
		}
		else {
			setAdData((prev) => ({
				...prev,
				[name]: value,
			}));
		}

		console.log("Updated adData:", adData);
	};

	// handle change of switch
	const handleSwitchChange = (checked) => {
		setAdData((prev) => ({
			...prev,
			tradeOption: checked,
		}));
	};

	// show/hide address section
	const toggleAddressSection = () => {
		setExpandAddress(!expandAddress);
	};

	// manage formData and submit
	const handleSubmit = async (e) => {
		e.preventDefault();

		// create array of tag names by using different tag properties
		const tagArr = [];
		if (adData.condition.length > 0) tagArr.push(tags.find(item => item.tag_id === parseInt(adData.condition)).name);
		if (adData.material.length > 0) tagArr.push(tags.find(item => item.tag_id === parseInt(adData.material)).name);
		if (adData.color.length > 0) tagArr.push(tags.find(item => item.tag_id === parseInt(adData.color)).name);
		if (adData.diverse.length > 0) tagArr.push(tags.find(item => item.tag_id === parseInt(adData.diverse)).name);

		// create form data
		const formDataToSend = new FormData();
		formDataToSend.append("user_id", userData._id);
		formDataToSend.append("title", adData.title);
		formDataToSend.append("description", adData.description);
		formDataToSend.append("tradeOption", adData.tradeOption);
		formDataToSend.append("categories", adData.categories);
		formDataToSend.append("subCategory", adData.subCategory);
		formDataToSend.append("condition", adData.condition);
		formDataToSend.append("material", adData.material);
		formDataToSend.append("color", adData.color);
		formDataToSend.append("diverse", adData.diverse);
		formDataToSend.append("tags", tagArr.join(', '));
		//formDataToSend.append("tags", adData.tags);
		formDataToSend.append("pickupaddress[street]", adData.pickupaddress.street);
		formDataToSend.append("pickupaddress[housenumber]", adData.pickupaddress.housenumber);
		formDataToSend.append("pickupaddress[zip]", adData.pickupaddress.zip);
		formDataToSend.append("pickupaddress[city]", adData.pickupaddress.city);
		formDataToSend.append("pickupaddress[country]", adData.pickupaddress.country);

		// append files (file objects of files to be uploaded)
		for (let i = 0; i < adData.media_files.length; i++) {
			formDataToSend.append("media_files", adData.media_files[i]);
		}

		// append existing file urls
		adData.media.forEach(mediaItem => {
			formDataToSend.append("media", mediaItem);
		});

		// make the request
		try {
			const response = await axios.put(
				`${import.meta.env.VITE_API_URL}/ads/${adid}`,
				formDataToSend,
				{
					headers: {"Content-Type": "multipart/form-data"},
					withCredentials: true
				}
			);
			console.log("Ad updated successfully:", response.data);
			toast.success("Ad updated successfully");
			//navigate(`/ads/${adid}`); // Redirect to the ad detail page
		}
		catch (error) {
			console.error("Error updating ad:", error);
			toast.success("Error updating ad");
		}
		setOpenDropzone(false);
	};

	// render HTML
	return (
		<>
			<ToastContainer />
			<h1>Anzeige bearbeiten</h1>
			{(isLoggedIn && !loading) ? (
				<>
					{openDropzone ?
						<Uploader
							setDropImages={setDropImages}
							setOpenDropzone={setOpenDropzone}
						/> :
						<Gallery
							adid={adid}
							setOpenDropzone={setOpenDropzone}
						/>
					}
					<form onSubmit={handleSubmit}>
						<div className="flex items-center mb-4">
							<label className="mr-2"></label>
							<div className="relative">
								<Switch
									onChange={handleSwitchChange}
									checked={adData.tradeOption}
									className="react-switch"
									offColor="#888"
									onColor="#4CAF50"
									height={20}
									width={48}
									uncheckedIcon={false}
									checkedIcon={false}
								/>
							</div>
							<span className="ml-2 text-gray-700">Tauschen Option</span>
						</div>
						<div className="max-w-[700px]">
							<label className="block mb-1">Titel:</label>
							<input
								type="text"
								name="title"
								value={adData.title}
								onChange={handleChange}
								className="form-input"
								required
							/>
						</div>
						<div className="max-w-[700px]">

							<button
								type="button"
								className="form-button bg-white/30 text-teal-500 w-fill"
								onClick={toggleAddressSection}
							>
								{expandAddress ? "Einklappen" : "Alternative Abholadresse?"}
							</button>

							{expandAddress && (
								<div className="p-4 bg-white/30 shadow-md rounded-lg mt-2">
									<h2 className="text-xl font-semibold mb-4">Alternative Abholadresse</h2>
									<div className="mb-4">
										<label className="block mb-1">Straße:</label>
										<input
											type="text"
											name="pickupaddress.street"
											value={adData.pickupaddress.street}
											onChange={handleChange}
											className="form-input"
										/>
									</div>
									<div className="mb-4">
										<label className="block mb-1">Hausnummer:</label>
										<input
											type="text"
											name="pickupaddress.housenumber"
											value={adData.pickupaddress.housenumber}
											onChange={handleChange}
											className="form-input"
										/>
									</div>
									<div className="container flex">
										<div className="mb-4">
											<label className="block mb-1">PLZ:</label>
											<input
												type="text"
												name="pickupaddress.zip"
												value={adData.pickupaddress.zip}
												onChange={handleChange}
												className="form-input"
											/>
										</div>
										<div className="mb-4 flex-row px-3">
											<label className="block mb-1">Stadt:</label>
											<input
												type="text"
												name="pickupaddress.city"
												value={adData.pickupaddress.city}
												onChange={handleChange}
												className="form-input"
											/>
										</div>
										<div className="mb-4">
											<label className="block mb-1">Land:</label>
											<input
												type="text"
												name="pickupaddress.country"
												value={adData.pickupaddress.country}
												onChange={handleChange}
												className="form-input"
											/>
										</div>
									</div>
								</div>
							)}
						</div>
						<div className="max-w-[700px]">

							<label className="block mb-1">Beschreibung:</label>
							<textarea
								name="description"
								value={adData.description}
								onChange={handleChange}
								className="form-input"
								rows="4"
								placeholder="Beschreibe deinen Artikel..."
							></textarea>
						</div>
						<div className="max-w-[700px]">
							<label className="block mb-1">Kategorie:</label>
							<select
								name="category"
								value={selectedCategory}
								onChange={(e) => {
									setSelectedCategory(e.target.value);
									setAdData({...adData, categories: e.target.value });
								}}
								className="form-select"
								required
							>
								<option>Wähle eine Kategorie</option>
								{filteredCategories.map((category) => (
									<option key={category.cat_id} value={category.cat_id}>
										{category.name}
									</option>
								))}
							</select>
						</div>
						<div className="max-w-[700px]">
							<label className="block mb-1">Unterkatgeorie:</label>
							<select
								name="subCategory"
								value={selectedSubCategory}
								onChange={(e) => {
									setSelectedSubCategory(e.target.value);
									setAdData({...adData, subCategory: e.target.value });
								}}
								className="form-select"
								required
							>
								<option value="">Wähle eine Unterkategorie</option>
								{subCategories.map((subCategory) => (
									<option
										key={subCategory.cat_id}
										value={subCategory.cat_id}
									>
										{subCategory.name}
									</option>
								))}
							</select>
						</div>
						<div className="max-w-[700px]">
							<label className="block mb-1">Zustand:</label>
							<select
								name="condition"
								value={selectedCondition}
								onChange={(e) => {
									setSelectedCondition(e.target.value);
									setAdData({...adData, condition: e.target.value });
								}}
								className="form-select"
							>
								<option>Wähle einen Zustand</option>
								{conditionTags.map((tag) => (
										<option key={tag.tag_id} value={tag.tag_id}>
											{tag.name}
										</option>
									))}
							</select>
						</div>
						<div className="max-w-[700px]">
							<label className="block mb-1">Material:</label>
							<select
								name="material"
								value={selectedMaterial}
								onChange={(e) => {
									setSelectedMaterial(e.target.value);
									setAdData({...adData, material: e.target.value });
								}}
								className="form-select"
							>
								<option value="">Wähle das Material</option>
								{materialTags.map((tag) => (
									<option key={tag.tag_id} value={tag.tag_id}>
										{tag.name}
									</option>
								))}
							</select>
						</div>
						<div className="max-w-[700px]">
							<label className="block mb-1">Farbe:</label>
							<select
								name="color"
								value={selectedColor}
								onChange={(e) => {
									setSelectedColor(e.target.value);
									setAdData({...adData, color: e.target.value });
								}}
								className="form-select"
							>
								<option value="">Wähle eine Farbe</option>
								{colorTags.map((tag) => (
									<option key={tag.tag_id} value={tag.tag_id}>
										{tag.name}
									</option>
								))}
							</select>
						</div>
						<div className="max-w-[700px]">
							<label className="block mb-1">Diverse:</label>
							<select
								name="diverse"
								value={selectedDiverse}
								onChange={(e) => {
									setSelectedDiverse(e.target.value);
									setAdData({...adData, diverse: e.target.value });
								}}
								className="form-select"
							>
								<option value="">Select</option>
								{diverseTags.map((tag) => (
									<option key={tag.tag_id} value={tag.tag_id}>
										{tag.name}
									</option>
								))}
							</select>
						</div>
						<button type="submit" className="btn-teal py-2 px-4">
							Anzeige aktualisieren
						</button>
					</form>

					<div className="mt-8 flex gap-2">
						<NavLink to={'/profile/'} className="bg-gray-50 py-2 px-4">
							zurück zur Übersicht
						</NavLink>
						<NavLink to={'/ads/'+adid} className="bg-gray-50 py-2 px-4">
							Anzeige ansehen
						</NavLink>
					</div>

				</>
			) : (
				<LoginForm />
			)}
		</>
	);
};

export default EditAd;
