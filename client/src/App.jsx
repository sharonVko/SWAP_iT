import { Route, Routes } from "react-router-dom";
import Home from "./views/Home.jsx";
import logo from "./assets/swapit-logo-transparent.png";

function App() {

	return (
		<div className="flex flex-col h-screen">

			<header className="px-4 py-3">
				<div className="container mx-auto flex">





					<button className="text-3xl w-16 text-green-700">
						<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M3 6h18M3 12h18M3 18h18"/></svg>
					</button>
					<div className="flex-1">
						<img src={logo} alt="SwapIt Logo" className="mx-auto" />
					</div>
					<div className="w-16 flex gap-3">
						<button className="text-2xl text-green-700">
							<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21l-4.486-4.494M19 10.5a8.5 8.5 0 1 1-17 0a8.5 8.5 0 0 1 17 0Z"/></svg>
						</button>
						<button className="text-2xl text-green-700">
							<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="7" r="5"/><path strokeLinecap="round" strokeLinejoin="round" d="M17 14h.352a3 3 0 0 1 2.976 2.628l.391 3.124A2 2 0 0 1 18.734 22H5.266a2 2 0 0 1-1.985-2.248l.39-3.124A3 3 0 0 1 6.649 14H7"/></g></svg>
						</button>
					</div>

				</div>
			</header>

			<main className="px-2 flex-1">
				<div className="container mx-auto">
					<Routes>
						<Route path="/" element={<Home />} />
					</Routes>
				</div>
			</main>

			<footer className="px-2 bg-red-500">
				<div className="bnbn container mx-auto">
					FOOTER
				</div>
			</footer>

		</div>
	);
}

export default App;
