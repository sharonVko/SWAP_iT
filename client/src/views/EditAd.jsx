import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UseContextStore } from "../context/ContextProvider.jsx";
import { useAuth } from "../context/AuthProvider.jsx";
import LoginForm from "../components/LoginForm.jsx";
import Uploader from "../components/Uploader.jsx";
import Gallery from "../components/Gallery.jsx";
import axios from 'axios';

const EditAd = () => {
	const { isLoggedIn, userData } = useAuth();
	const { adid } = useParams();
	const { updatedImages } = UseContextStore();
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
			tags: [],
			media: [],
		  media_files: [],
			condition: "",
			material: "",
			color: "",
			diverse: "",
		});
	const [imgArr, setImgArr] = useState([]);
	const [loading, setLoading] = useState(true);
	const [openDropzone, setOpenDropzone] = useState(false);
	const [dropImages, setDropImages] = useState([]);

	// fetch Ad Data depending on 'adid' (url param)
	useEffect(() => {
		const fetchAdData = async () => {
			try {
				const response = await axios.get(`http://localhost:8000/ads/${adid}`);
				const data = response.data;
				setAdData({
					title: data.title || "",
					description: data.description || "",
					tradeOption: data.tradeOption || true,
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
					condition: data.condition || "",
					material: data.material || "",
					color: data.color || "",
					diverse: data.diverse || ""
				});
				setImgArr(data.media);
				setLoading(false);
			}
			catch (error) {
				console.error("Error fetching ad data:", error);
				setLoading(false);
			}
		};
		if (adid) fetchAdData();
	}, [adid]);

	// update adData depending on context var 'reorderedImages'
	useEffect(() => {
		if (isLoggedIn && !loading) {
			if (updatedImages.length !== 0) {
				setImgArr(updatedImages);
				setAdData((prev) => ({
					...prev,
					media: [...updatedImages],
				}));
			}
		}
	}, [updatedImages]);

	useEffect(() => {
		if (dropImages) {
			setAdData((prev) => ({
				...prev,
				media_files: dropImages,
			}));
		}
	}, [dropImages]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		console.log('adData.media: ', adData.media);

		const formDataToSend = new FormData();
		formDataToSend.append("user_id", userData._id);
		formDataToSend.append("title", adData.title);
		formDataToSend.append("description", adData.description);
		formDataToSend.append("tradeOption", adData.tradeOption);
		formDataToSend.append("categories", adData.categories);
		formDataToSend.append("subCategory", adData.subCategory);
		formDataToSend.append("tags", adData.tags);
		formDataToSend.append("condition", adData.condition);
		formDataToSend.append("material", adData.material);
		formDataToSend.append("color", adData.color);
		formDataToSend.append("pickupaddress[street]", adData.pickupaddress.street);
		formDataToSend.append("pickupaddress[housenumber]", adData.pickupaddress.housenumber);
		formDataToSend.append("pickupaddress[zip]", adData.pickupaddress.zip);
		formDataToSend.append("pickupaddress[city]", adData.pickupaddress.city);
		formDataToSend.append("pickupaddress[country]", adData.pickupaddress.country);

		for (let i = 0; i < adData.media_files.length; i++) {
			formDataToSend.append("media_files", adData.media_files[i]);
		}

		adData.media.forEach(mediaItem => {
			formDataToSend.append("media", mediaItem);
		});

		for (let item of formDataToSend.entries()) {
			console.log(item);
		}

		try {
			const response = await axios.put(
				`http://localhost:8000/ads/${adid}`,
				formDataToSend,
				{
					headers: {"Content-Type": "multipart/form-data"},
					withCredentials: true
				}
			);
			console.log("Ad updated successfully:", response.data);
			//navigate(`/ads/${adid}`); // Redirect to the ad detail page
		}
		catch (error) {
			console.error("Error updating ad:", error);
		}

	};



	return (
		<div className="container mx-auto py-4">
			{(isLoggedIn && !loading) ? (
				<>
					{openDropzone ?
						<Uploader
							setDropImages={setDropImages}
							setOpenDropzone={setOpenDropzone}
						/> :
						<Gallery
							imgArr={imgArr}
							setOpenDropzone={setOpenDropzone}
						/>
					}
					<form onSubmit={handleSubmit}>
						<button type="submit" className="btn-teal">
							Anzeige aktualisieren
						</button>
					</form>

				</>

			) : (
				<LoginForm/>
			)}
		</div>
	);
};

export default EditAd;
