import { Route, Routes } from "react-router-dom";
import Home from "./views/Home.jsx";
import Navbar from "./components/Navbar.jsx";
import Searchbar from "./components/Searchbar.jsx";
import Footer from "./components/Footer.jsx";

function App() {

	return (
		<div className="flex flex-col h-screen">
			<header className="px-4 py-3">
				<Navbar />
				{/*<Searchbar />*/}
			</header>
			<main className="px-4 py-8 flex-1">
				<div className="container mx-auto">
					<Routes>
						<Route path="/" element={<Home />} />
					</Routes>
				</div>
			</main>
			<footer className="px-4 py-3 bg-red-500">
				<Footer/>
			</footer>
		</div>
	);
}

export default App;
