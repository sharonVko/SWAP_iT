
function Modal({children, setShowModal}) {

	return (
		<div id="popup-modal" tabIndex="-1" className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-gray-900 bg-opacity-50" onClick={() => setShowModal(false)}>
			<div className="relative p-4 w-full max-w-2xl max-h-full" onClick={e => e.stopPropagation()}>
				<div className="relative bg-peach-500 rounded-lg shadow dark:bg-gray-700 p-4 md:p-6 lg:p-8">
					<button
						type="button"
						className="absolute top-3 right-2.5 text-black-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
						onClick={() => setShowModal(false)}
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
					{children}
				</div>
			</div>
		</div>
	)
}

export default Modal;
