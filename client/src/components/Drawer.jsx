import React from "react";

export const Drawer = (props) => {
	const { open, pos, onClose } = props;
	return (
		<>
			<div className={`drawer-overlay${open ? ' show' : ''}`} onClick={onClose} aria-hidden="true">
				<div className="drawer-overlay-top">top</div>
				<div className="drawer-overlay-bottom">top</div>
			</div>
			<div className={`drawer ${open ? 'show' : ''}`} tabIndex="-1">

				<div className="flex justify-end">
					<button onClick={onClose} className="text-teal text-3xl">
						<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m11 5l-7 7l7 7m-7-7h16"/></svg>
					</button>
				</div>
			</div>
		</>
	);
};
