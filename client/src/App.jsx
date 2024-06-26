import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Searchbar from "./components/Searchbar.jsx";
import Footer from "./components/Footer.jsx";

import Home from "./views/Home.jsx";
import NotFound from "./views/NotFound.jsx";
import Chats from "./views/Chats.jsx";
import SingleChat from "./views/SingleChat.jsx";
import UserLogin from "./views/UserLogin.jsx";
import UserSignUp from "./views/UserSignUp.jsx";
import UserLogout from "./views/UserLogout.jsx";
import UserProfile from "./views/UserProfile.jsx";
import ChangePassword from "./views/ChangePassword.jsx";

import FilteredAds from "./views/FilteredAds.jsx";
import MyAds from "./views/MyAds.jsx";
import CreateAd from "./views/CreateAd.jsx";
import EditAd from "./views/EditAd.jsx";
import DeleteAd from "./views/DeleteAd.jsx";


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
						<Route path="/signup" element={<UserSignUp />} />
						<Route path="/login" element={<UserLogin />} />
						<Route path="/logout" element={<UserLogout />} />

						<Route path="/profile" element={<UserProfile />} />
						<Route path="/profile/edit" element={<UserProfile />} />
						<Route path="/profile/password" element={<ChangePassword />} />
						{/*<Route path="/profile/photo" element={<ChangePhoto />} />*/}

						<Route path="/profile/ads" element={<MyAds />} />
						<Route path="/profile/ads/new" element={<CreateAd />} />
						<Route path="/profile/ads/edit/:adid" element={<EditAd />} />
						<Route path="/profile/ads/delete/:adid" element={<DeleteAd />} />

						<Route path="/ads" element={<FilteredAds />} />
						<Route path="/ads/new" element={<FilteredAds />} />
						<Route path="/ads/category/:category" element={<FilteredAds />} />
						<Route path="/ads/tag/:tag" element={<FilteredAds />} />
						<Route path="/ads/search/:query" element={<FilteredAds />} />
						<Route path="/ads/user/:user" element={<FilteredAds />} />

						<Route path="/chats" element={<Chats />} />
						<Route path="/singlechat" element={<SingleChat />} />
						<Route path="*" element={<NotFound />} />

					</Routes>
				</div>
			</main>
			<footer className="px-4 py-3">
				<Footer/>
			</footer>
		</div>
	);
}

export default App;
