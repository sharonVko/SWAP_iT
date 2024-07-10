import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate} from "react-router-dom";
import ArticleList from "../components/ArticleList.jsx";
import { useAuth } from "../context/AuthProvider.jsx";
import HomeSwiper from "../components/HomeSwiper.jsx";
import SwapSchema from "../components/SwapSchema.jsx";

const Home = () => {
	const navigate = useNavigate();
	const { isLoggedIn, userData } = useAuth();
	const [ads, setAds] = useState([]);
	const [interestAds, setInterestAds] = useState([]); // Update to interestAds state updater
	const [swapAds, setSwapAds] = useState([]); // Declare swapAds state updater
	const [newestAds, setNewestAds] = useState([]); // State for newest ads

	useEffect(() => {
		const fetchAdData = async () => {
			try {
				const response = await axios.get(`http://localhost:8000/ads/`);
				setAds(response.data);
			} catch (error) {
				console.error("Error fetching ad data:", error);
			}
		};
		fetchAdData();
	}, []);

	useEffect(() => {
		if (userData && ads.length > 0) {
			ads.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
			setNewestAds(ads.slice(0, 20))
		}
	}, [userData, ads]);

	const goTo = (target) => {
		navigate(target);
	}

	return (
		<>
			{!isLoggedIn ? (
				<ArticleList />
			) : (
				<div className="pb-12">
					{/* Pass setInterestAds and setSwapAds as props to SwapSchema */}
					<SwapSchema setInterestAds={setInterestAds} setSwapAds={setSwapAds}/>
					<h1 className="text-center">Deine Top Swaps</h1>
					{/* Display user's ads with swapAds */}
					<HomeSwiper swiperId={1} articles={swapAds}/>
					<h2 className="h1 mt-8 text-center">Das könnte dir gefallen</h2>
					{/* Display interestAds under "Das könnte dir gefallen" */}
					<HomeSwiper swiperId={2} articles={interestAds}/>
					<button className="block btn-teal btn-md mx-auto mt-4 cursor-pointer" onClick={() => goTo("/ads")}>
						Mehr Angebote
					</button>
					<h2 className="h1 mt-8 text-center">Neueste Angebote</h2>
					{/* Display newest 20 articles under "Neue Angebote" */}
					<HomeSwiper swiperId={3} articles={newestAds}/>
					<button className="block btn-teal btn-md mx-auto mt-4 cursor-pointer" onClick={() => goTo("/ads")}>
						Mehr Angebote
					</button>
				</div>
			)}
		</>
	);

};
export default Home;
