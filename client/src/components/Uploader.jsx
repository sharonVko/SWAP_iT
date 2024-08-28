import { useState, useCallback } from "react";
import { useDropzone } from 'react-dropzone';

function Uploader({setOpenDropzone, setDropImages}) {

	const [selectedImages, setSelectedImages] = useState([]);

	const onDrop = useCallback(
		(acceptedFiles) => {
			const updatedImages = [...selectedImages, ...acceptedFiles];
			setSelectedImages(updatedImages);
			setDropImages(updatedImages);
		},
		[selectedImages]
	);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: "image/*",
		multiple: true,
	});

	const handleRemoveImage = (index) => {
		const updatedImages = [...selectedImages];
		updatedImages.splice(index, 1);
		setSelectedImages(updatedImages);
		setDropImages(updatedImages);
	};

	return (
		<div>
			<div
				{...getRootProps({
					className: "dropzone border-dashed border-2 p-4",
				})}
			>
				<input {...getInputProps()} />
				{isDragActive ? (
					<p className="text-gray-500 text-center">
						Drop file(s) here ...
					</p>
				) : (
					<p className="text-gray-500 text-center">
						Drag and drop oder klicke um Dateien auszuwählen
					</p>
				)}
			</div>

			<div className="flex flex-wrap -mx-2">
				{selectedImages.length > 0 &&
					selectedImages.map((image, index) => (
						<div key={index} className="w-1/4 p-2 relative">
							<img
								src={URL.createObjectURL(image)}
								alt={`Preview ${index + 1}`}
								className="max-w-full h-auto rounded-lg shadow"
							/>
							<button
								className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded"
								onClick={() => handleRemoveImage(index)}
							>
								Delete
							</button>
						</div>
					))}
			</div>
			<button onClick={() => setOpenDropzone(false)}>close</button>
		</div>
	)
}

export default Uploader;
