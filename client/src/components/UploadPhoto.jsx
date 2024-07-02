import React from "react";

function PhotoUpload() {
	return (
		<div className="flex items-center justify-center w-full">
			<label
				htmlFor="dropzone-file"
				className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
			>
				<div className="flex flex-col items-center justify-center pt-5 pb-6">
					<svg
						className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
						aria-hidden="true"
						fill="none"
						viewBox="0 0 20 16"
					>
						{/* SVG-Inhalt hier einfügen */}
					</svg>
					<p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
						<span className="font-semibold">Klicken zum Hochladen</span> oder
						ziehen und ablegen
					</p>
					<p className="text-xs text-gray-500 dark:text-gray-400">
						SVG, PNG, JPG oder GIF (MAX. 800x400px)
					</p>
				</div>
				<input id="dropzone-file" type="file" className="hidden" />
			</label>
		</div>
	);
}

export default PhotoUpload;
