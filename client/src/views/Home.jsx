import axios from "axios";
import { useState, useEffect } from "react";
import ArticleList from "../components/ArticleList.jsx";
import HomeSwiper from "../components/HomeSwiper.jsx";

const Home = () => {

	const [ads, setAds] = useState([]);
	useEffect(() => {
		const fetchArticleData = async () => {
			try {
				const response = await axios.get(`http://localhost:8000/ads/`);
				setAds(response.data);
			} catch (error) {
				console.error("Error fetching article data:", error);
			}
		};
		fetchArticleData();
	}, []);

	const filteredAds = ads.filter((ad, i) => {
		if (i < 8) return ad;
	});

	return (
		<div>
			<h1 className="mt-0 text-center">Top Matches</h1>
			<ArticleList/>
			<div>
				<h2 className="mt-6 text-center">Favoriten</h2>
				<HomeSwiper swiperId={1} articles={filteredAds} />
			</div>
			<div>
				<h2 className="h1 mt-6 text-center">Neues aus der Umgebung</h2>
				<HomeSwiper swiperId={2} articles={filteredAds}/>
			</div>
		</div>
	);
};

export default Home;
