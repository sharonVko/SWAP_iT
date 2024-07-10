import { useState } from "react";
import { Drawer } from "./components/Drawer.jsx";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

import Home from "./views/Home.jsx";
import NotFound from "./views/NotFound.jsx";
import SingleChat from "./views/SingleChat.jsx";
import SingleViewAd from "./views/SingleViewAd.jsx";

import RegisterForm from './components/RegisterForm.jsx';
import LoginForm from "./components/LoginForm.jsx";
import Chats from './views/Chats.jsx';

// import UserLogin from "./views/UserLogin.jsx";
// import UserSignUp from "./views/UserSignUp.jsx";

import UserLogout from "./views/UserLogout.jsx";
import UserProfile from "./views/UserProfile.jsx";
import UserSettings from "./views/UserSettings.jsx";
import ChangePassword from "./views/ChangePassword.jsx";
import FilteredAds from "./views/FilteredAds.jsx";
import MyAds from "./views/MyAds.jsx";
import CreateAd from "./views/CreateAd.jsx";
import EditAd from "./views/EditAd.jsx";
import DeleteAd from "./views/DeleteAd.jsx";
import ArticleList from "./components/ArticleList.jsx";

function App() {
  const [open, setOpen] = useState(false);

	const handleClose = () => setOpen(false);
	const handleToggle = () => {
		let isOpen = open;
		isOpen = !isOpen;
		setOpen(isOpen);
	};

  return (
    <div className="flex flex-col min-h-screen relative overflow-x-hidden">
      <header>
        <Navbar onToggleNav={handleToggle} onClose={handleClose} />
      </header>
      <main className="px-4 py-8 flex-1 relative">
        <div className="container mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<RegisterForm />} />
            <Route path="/login" element={<LoginForm target="/" />} />
            <Route path="/logout" element={<UserLogout />} />

						<Route path="/profile" element={<UserProfile />} />
            <Route path="/profile/settings" element={<UserSettings />} />
            <Route path="/profile/password" element={<ChangePassword />} />
            {/*<Route path="/profile/photo" element={<ChangePhoto />} />*/}

            <Route path="/profile/ads" element={<MyAds />} />
            <Route path="/profile/ads/new" element={<CreateAd />} />
            <Route path="/profile/ads/edit/:adid" element={<EditAd />} />
            <Route path="/profile/ads/delete/:adid" element={<DeleteAd />} />

            <Route path="/ads" element={<ArticleList />} />
            <Route path="/ads/new" element={<FilteredAds />} />
						<Route path="/ads/interest" element={<FilteredAds />} />
            <Route path="/ads/category/:category" element={<FilteredAds />} />
            <Route path="/ads/tag/:tag" element={<FilteredAds />} />
            <Route path="/ads/search/:query" element={<FilteredAds />} />
            <Route path="/ads/user/:user" element={<FilteredAds />} />
            <Route path="/ads/:articleId" element={<SingleViewAd />} />

						<Route path="/chats" element={<Chats />} />
						<Route path="/singlechat/:chatId/:adId/:receiverId" element={<SingleChat />} />
						<Route path="*" element={<NotFound />} />

					</Routes>
				</div>
			</main>

			<footer className="footer px-4 py-8 bg-teal-500 relative z-300">
				<Footer />
			</footer>

			<Drawer open={open} onClose={handleClose} />

		</div>
	);
}

export default App;
