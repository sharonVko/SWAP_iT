// import { Route, Routes } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HeaderMitSearchBar from "./components/HeaderMitSearchBar.jsx";
import HeaderOhneSearchBar from "./components/HeaderOhneSearchBar.jsx";
import Home from "./views/Home.jsx";
import SingleViewAd from "./views/SingleViewAd.jsx";
import UserSignUp from "./views/UserSignUp.jsx";
import UserLogin from "./views/UserLogin.jsx";
import UserLogout from "./views/UserLogout.jsx";

import UserProfile from "./views/UserProfile.jsx";
// Filter
// import ChangePW from "./views/ChangePW";
// import ChangePhoto from "./views/ChangePhoto";
// import ChangeAdresse from "../views/ChangeAdresse";

import FilteredAds from "./views/FilteredAds.jsx";
// Filter
// import NewAds from "./views/NewAds";
// import AdsByCategory from "../views/AdsByCategory";
// import AdsByTag from "../views/AdsByTag";
// import AdsBySearchText from "../views/AdsBySearchText";
// import AdsByUser from "../views/AdsByUser";
// import ShowAllAds from "../views/ShowAllAds";

import MyAds from "./views/MyAds.jsx";

import CreateAd from "./views/CreateAd.jsx";
// Filter
// import EditAd from "../views/EditAd";
// import DeleteAd from "../views/DeleteAd";
// import DeactivateAd from "../views/DeactivateAd";
// import ExtendAd from "../views/ExtendAd";

import Chats from "./views/Chats.jsx";
import SingleChat from "./views/SingleChat.jsx";

import NotFound from "./views/NotFound.jsx";

import PopUpMenue from "./components/PopUpMenue.jsx";

// Original Routes mit ID und Auth */

// function App() {
// 	return (
// 		<BrowserRouter>
// 			<Routes>

// 				<Route path="/" element={<Home />} />

// 				<Route path="hps" element={<HeaderPlusSearchBar />} />
// 				<Route path="hos" element={<HeaderOhneSearchBar />} />

// 				<Route path="/ads/:adid" element={<SingleViewAd />} />

// 				<Route path="/auth/signup" element={<UserSignUp />} />

// 				<Route path="/auth/login" element={<UserLogin />} />

// 				<Route path="/auth/logout" element={<UserLogout />} />

// 				<Route path="/user/:userid/profile" element={<UserProfile />} />
// 				<Route path="pw" element={<ChangePW />} />
// 				<Route path="photo" element={<ChangePhoto />} />
// 				<Route path="adress" element={<ChangeAdresse />} />

// 				<Route path="/ads" element={<FilteredAds />} />
// 				<Route path="/ads/new" element={<NewAds />} />
// 				<Route path="/ads/category/:category" element={<AdsByCategory />} />
// 				<Route path="/ads/tag/:tag" element={<AdsByTag />} />
// 				<Route path="/ads/search/:query" element={<AdsBySearchText />} />
// 				<Route path="/ads/user/:user" element={<AdsByUser />} />
// 				<Route path="/ads/all" element={<ShowAllAds />} />

// 				<Route path="/myads" element={<MyAds />} />

// 				<Route path="/createad" element={<CreateAd />} />
// 				<Route path="/editad/:adId" element={<EditAd />} />
// 				<Route path="/deletead/:adId" element={<DeleteAd />} />
// 				<Route path="/deactivatead/:adId" element={<DeactivateAd />} />
// 				<Route path="/extendad/:adId" element={<ExtendAd />} />

// 				<Route path="/chats" element={<Chats />} />
// 				<Route path="/chats/:chatID" element={<SingleChat />} />

// 				<Route path="*" element={<NotFound />} />
// 			</Routes>

// 		</BrowserRouter>
// 	);
// }

{
	/* Routes  für das Switchen zuwischen den Pages, während der Bearbeitung ohne ID und Auth */
}

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />

				<Route path="hps" element={<HeaderMitSearchBar />} />
				<Route path="hos" element={<HeaderOhneSearchBar />} />

				<Route path="/ads" element={<SingleViewAd />} />

				<Route path="/signup" element={<UserSignUp />} />

				<Route path="/login" element={<UserLogin />} />

				<Route path="/logout" element={<UserLogout />} />

				<Route path="/profile" element={<UserProfile />} />
				{/* <Route path="pw" element={<ChangePW />} />
				<Route path="photo" element={<ChangePhoto />} />
				<Route path="adress" element={<ChangeAdresse />} /> */}

				<Route path="/ads" element={<FilteredAds />} />
				{/* <Route path="/ads/new" element={<NewAds />} />
				<Route path="/ads/category/:category" element={<AdsByCategory />} />
				<Route path="/ads/tag/:tag" element={<AdsByTag />} />
				<Route path="/ads/search/:query" element={<AdsBySearchText />} />
				<Route path="/ads/user/:user" element={<AdsByUser />} />
				<Route path="/ads/all" element={<ShowAllAds />} /> */}

				<Route path="/myads" element={<MyAds />} />

				<Route path="/createad" element={<CreateAd />} />
				{/* <Route path="/editad/:adId" element={<EditAd />} />
				<Route path="/deletead/:adId" element={<DeleteAd />} />
				<Route path="/deactivatead/:adId" element={<DeactivateAd />} />
				<Route path="/extendad/:adId" element={<ExtendAd />} /> */}

				<Route path="/chats" element={<Chats />} />
				<Route path="/singlechat" element={<SingleChat />} />

				<Route path="*" element={<NotFound />} />

				<Route path="/popupmenue" element={<PopUpMenue />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
