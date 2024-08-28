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

	const removeImage = (index) => {

		console.log(index);

		if (index > -1) images.splice(index, 1);

		console.log(images);


	}


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

					<button className="absolute top-1 right-1 bg-teal-500 text-white rounded-full p-1 drop-shadow" onClick={() => removeImage(index)}>
						<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m13.41 12l6.3-6.29a1 1 0 1 0-1.42-1.42L12 10.59l-6.29-6.3a1 1 0 0 0-1.42 1.42l6.3 6.29l-6.3 6.29a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0l6.29-6.3l6.29 6.3a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42Z"/></svg>
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
