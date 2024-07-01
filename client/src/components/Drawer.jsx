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
				<button onClick={onClose}>X</button>
			</div>
		</>
	);
};
