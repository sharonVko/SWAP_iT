import React from "react";

import { Link } from "react-router-dom";

// import burgerMenuIcon from "./assets/burger-menu.png";
// import swapLogo from "./assets/SwapLogo2.jpg";

const HeaderPlusSearchBar = () => {
	return (
		<div>
			<div className="text-teal-700 text-4xl">Header mit Searchbar</div>
			<Link className="text-cyan-600" to="/">
				Home..
			</Link>

			<Link className="text-cyan-600" to="/popupmenue">
				PopUpMenue...
			</Link>
		</div>
	);
};

const Header = () => {
	return (
		<header className="text-green-900">
			<nav className="sticky top-0 bg-gradient-to-r from-orange-100 to-orange-200">
				<div className="flex justify-between items-center px-4">
					<div className="flex items-center gap-2">
						<img src={burgerMenuIcon} alt="Menu" width="50" />
						<img src={swapLogo} alt="Logo" width="50" />
						<span className="text-2xl font-extrabold">SWAP IT!</span>
					</div>
					{/* Suchleiste in der Mitte */}
					<div className="flex mx-8">
						<input
							type="search"
							placeholder="Suchen..."
							className="w-full p-2 rounded-full border border-gray-300"
						/>
					</div>
					{/* Kontakt Buttons */}
					<div className="flex gap-2">
						<button className="border border-white rounded-full font-bold px-8 py-2">
							Anmelden
						</button>
						<button className="border border-white rounded-full font-bold px-8 py-2">
							Registrieren
						</button>
					</div>
				</div>
			</nav>
		</header>
	);
};

export default HeaderPlusSearchBar;
Header;
