import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthProvider.jsx";
import HomeSwiper from "../components/HomeSwiper.jsx";
import SwapSchema from "../components/SwapSchema.jsx";
const Home = () => {
	const { userData } = useAuth();
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
			// Filter out user's ads
			// eigene Anzeiogen werden ausgefiltert
			// const filteredInterestAds = ads.filter(
			//   (ad) => ad.user_id !== userData._id
			// );
			// Sort by timestamp (newest first) and limit to 20 ads
			// filteredInterestAds.sort(
			//   (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
			// );
			// const newestAds = filteredInterestAds.slice(0, 20);
			//setInterestAds(filteredInterestAds); 	// Update interestAds state
			//setNewestAds(newestAds); 							// Update myNewestAds state
		}
	}, [userData, ads]);
	return (
		<div className="pb-12">
			{/* Pass setInterestAds and setSwapAds as props to SwapSchema */}
			<SwapSchema setInterestAds={setInterestAds} setSwapAds={setSwapAds} />
			<h1 className="text-center">Deine Top Swaps</h1>
			{/* Display user's ads with swapAds */}
			<HomeSwiper swiperId={1} articles={swapAds} />
			<h2 className="h1 mt-8 text-center">Das könnte dir gefallen</h2>
			{/* Display interestAds under "Das könnte dir gefallen" */}
			<HomeSwiper swiperId={2} articles={interestAds} />
			<button className="block btn-teal btn-md mx-auto mt-4">
				Mehr Angebote
			</button>
			<h2 className="h1 mt-8 text-center">Neueste Angebote</h2>
			{/* Display newest 20 articles under "Neue Angebote" */}
			<HomeSwiper swiperId={3} articles={newestAds} />
			<button className="block btn-teal btn-md mx-auto mt-4">
				Mehr Angebote
			</button>
		</div>
	);
};
export default Home;
