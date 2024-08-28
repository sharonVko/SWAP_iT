import { useState, useRef } from "react";
import { UseContextStore } from "../context/ContextProvider.jsx";

function Gallery({imgArr, setOpenDropzone }) {

	const { setReorderedImages } = UseContextStore();
	const [images, setImages] = useState(imgArr);
	const dragItem= useRef(null);
	const dragOverItem= useRef(null);


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
		setReorderedImages(_images);
	};

	return (
		<div className="gallery flex gap-2">

			{images && images.map((fileUrl, index) => (
				<div key={index}
						 className="w-[150px] aspect-[3/2] relative overflow-hidden rounded-md cursor-move bg-white/60 drop-shadow-lg"
						 draggable
						 onDragStart={(e) => (dragItem.current = index)}
						 onDragEnter={(e) => (dragOverItem.current = index)}
						 onDragEnd={handleSort}
						 onDragOver={(e) => e.preventDefault()}
				>
					<img src={fileUrl} alt="#" className="absolute top-0 left-0 w-full h-full object-cover" />

					<button className="absolute top-2">
						<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
							<path fill="currentColor" d="M15.71 8.29a1 1 0 0 0-1.42 0L12 10.59l-2.29-2.3a1 1 0 0 0-1.42 1.42l2.3 2.29l-2.3 2.29a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0l2.29-2.3l2.29 2.3a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42L13.41 12l2.3-2.29a1 1 0 0 0 0-1.42m3.36-3.36A10 10 0 1 0 4.93 19.07A10 10 0 1 0 19.07 4.93m-1.41 12.73A8 8 0 1 1 20 12a7.95 7.95 0 0 1-2.34 5.66"/>
						</svg>
					</button>

				</div>
			))}

			<button onClick={() => setOpenDropzone(true)} className="w-[150px] aspect-[3/2] relative overflow-hidden rounded-md bg-white/60 drop-shadow-lg flex justify-center items-center text-4xl text-teal-700/50">
				<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M19 11h-6V5a1 1 0 0 0-2 0v6H5a1 1 0 0 0 0 2h6v6a1 1 0 0 0 2 0v-6h6a1 1 0 0 0 0-2"/></svg>
				<span className="sr-only">Bild hinzufügen</span>
			</button>

		</div>
	)
}

export default Gallery;
