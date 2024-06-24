import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./views/Home";
import SingleViewAd from "./views/SingleViewAd";
import UserLogin from "./views/UserLogin";
import UserSignUp from "./views/UserSignUp";

import UserProfile from "./views/UserProfile";
import FilteredAds from "./views/FilteredAds";
import MyAds from "./views/MyAds";
import CreateAd from "./views/CreateAd";
import Chats from "./views/Chats";
import SingleChat from "./views/SingleChat";
import ErrorPage from "./views/ErrorPage";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/singleviewad" element={<SingleViewAd />} />
				<Route path="/login" element={<UserLogin />} />
				<Route path="/signup" element={<UserSignUp />} />
				<Route path="/UserProfilel" element={<UserProfile />} />
				<Route path="/filter" element={<FilteredAds />} />
				<Route path="/myads" element={<MyAds />} />
				<Route path="/create" element={<CreateAd />} />
				<Route path="/chats" element={<Chats />} />
				<Route path="/SingleChat" element={<SingleChat />} />
				<Route path="/Error" element={<ErrorPage />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
