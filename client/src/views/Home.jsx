import axios from "axios";
import { useState, useEffect } from "react";
import HomeSwiper from "../components/HomeSwiper.jsx";
import SwapSchema from "../components/SwapSchema.jsx";
import ArticleCard from "../components/ArticleCard.jsx";

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

  ads.reverse();

  const filteredAds = ads.filter((ad, i) => {
    if (i < 8) return ad;
  });

	return (
		<div className="pb-12">

			<h1 className="text-center">Deine Tauschangebote</h1>
			<HomeSwiper swiperId={1} articles={filteredAds} />

			<h2 className="h1 mt-8 text-center">Das könnte dir gefallen</h2>
			<HomeSwiper swiperId={2} articles={filteredAds}/>
			<button className="block btn-teal btn-md mx-auto mt-4">Mehr Angebote</button>

			<h2 className="h1 mt-8 text-center">Neue Angebote aus der Umgebung</h2>
			<HomeSwiper swiperId={2} articles={filteredAds}/>
			<button className="block btn-teal btn-md mx-auto mt-4">Mehr Angebote</button>

		</div>
	);

};

export default Home;
