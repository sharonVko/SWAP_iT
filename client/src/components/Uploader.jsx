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

	const handleCloseDropzone = () => {
		setOpenDropzone(false);
	}

	return (

		<div className=" rounded-xl pt-2 pb-6 px-6 relative bg-white/20">
			<button
				type="button"
				className="absolute top-3 right-2.5 text-black-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
				onClick={handleCloseDropzone}
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
				<span className="sr-only">Close modal</span>
			</button>

			<h2 className="text-center mb-4">Upload Anzeigenbilder</h2>

			<div className="flex flex-col gap-6">
				<div {...getRootProps({className: "dropzone border-white border-dashed border-2 p-4 rounded-lg cursor-pointer bg-white/40"})}>

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
				{selectedImages.length > 0 &&
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2">
					{selectedImages.map((image, index) => (
						<div key={index} className="w-full aspect-[3/2] relative overflow-hidden rounded-md cursor-move bg-white/60 p-2 drop-shadow">
								<img
									src={URL.createObjectURL(image)}
									alt={`Preview ${index + 1}`}
									className="absolute top-0 left-0 w-full h-full object-cover"
								/>
								<button
									className="absolute top-1 right-1 text-gray-900 hover:text-white bg-white hover:bg-teal-600 rounded-lg text-sm w-6 h-6 inline-flex justify-center items-center"
									onClick={() => handleRemoveImage(index)}
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
				</div>
				}
			</div>

		</div>
	)
}

export default Uploader;
