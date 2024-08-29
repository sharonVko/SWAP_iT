import axios from "axios";
import {useState, useRef, useEffect} from "react";
import { UseContextStore } from "../context/ContextProvider.jsx";

function Gallery({ adid, setOpenDropzone }) {

	const { setUpdatedImages } = UseContextStore();
	const [loading, setLoading] = useState(true);
	const [images, setImages] = useState([]);
	const dragItem= useRef(null);
	const dragOverItem= useRef(null);

	useEffect(() => {
		const fetchImages = async () => {
			try {
				const response = await axios.get(`http://localhost:8000/ads/${adid}`);
				const data = response.data;
				setImages(data.media || []);
				setLoading(false);
			}
			catch (error) {
				console.error("Error fetching images:", error);
				setLoading(false);
			}
		};

		fetchImages();
	}, [adid]);


	//const handle drag sorting
	const handleSort = () => {

		//duplicate items
		let _images = [...images];

		//remove and save the dragged item content
		const draggedItemContent = _images.splice(dragItem.current, 1)[0];

		//switch the position
		_images.splice(dragOverItem.current, 0, draggedItemContent);

		//reset the position ref
		dragItem.current = null;
		dragOverItem.current = null;

		//update the actual array
		setImages(_images);

		//pass reordered array to context store
		setUpdatedImages(_images);
	};

	const removeImage = (index) => {
		let _images = [...images];
		if (index > -1) _images.splice(index, 1);
		setImages(_images);
		setUpdatedImages(_images);
	}

	return (
		<>
		{!loading && (
		<div className="gallery grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
			{images && images.map((fileUrl, index) => (
				<div key={index}
						 className="w-full aspect-[3/2] relative overflow-hidden rounded-md cursor-move bg-white/60 drop-shadow-lg"
						 draggable
						 onDragStart={(e) => (dragItem.current = index)}
						 onDragEnter={(e) => (dragOverItem.current = index)}
						 onDragEnd={handleSort}
						 onDragOver={(e) => e.preventDefault()}
				>
					<img src={fileUrl} alt="#" className="absolute top-0 left-0 w-full h-full object-cover" />

					<button
						className="absolute top-1 right-1 text-gray-900 hover:text-white bg-white hover:bg-teal-600 rounded-lg text-sm w-6 h-6 inline-flex justify-center items-center"
						onClick={() => removeImage(index)}
					>
						<svg
							className="w-3 h-3"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 14 14"
						>
							<path
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
							/>
						</svg>
					</button>

				</div>
			))}

			<button onClick={() => setOpenDropzone(true)} className="w-full aspect-[3/2] relative overflow-hidden rounded-md bg-white/60 drop-shadow-lg flex justify-center items-center text-4xl text-teal-700/50">
				<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M19 11h-6V5a1 1 0 0 0-2 0v6H5a1 1 0 0 0 0 2h6v6a1 1 0 0 0 2 0v-6h6a1 1 0 0 0 0-2"/></svg>
				<span className="sr-only">Bild hinzufügen</span>
			</button>

		</div>
		)}
		</>
	)
}

export default Gallery;
