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
						 className="w-[150px] aspect-[3/2] relative overflow-hidden rounded cursor-move"
						 draggable
						 onDragStart={(e) => (dragItem.current = index)}
						 onDragEnter={(e) => (dragOverItem.current = index)}
						 onDragEnd={handleSort}
						 onDragOver={(e) => e.preventDefault()}
				>
					<img src={fileUrl} alt="#" className="absolute top-0 left-0 w-full h-full object-cover" />
				</div>
			))}
			<div>
				<button onClick={() => setOpenDropzone(true)}>Add</button>
			</div>
		</div>
	)
}

export default Gallery;
