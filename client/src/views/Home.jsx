import axios from "axios";
import { useState, useEffect } from "react";
import ArticleList from "../components/ArticleList.jsx";
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
    <div>
      <h2 className="h1 mt-6 text-center">Favoriten</h2>
      <HomeSwiper swiperId={1} articles={filteredAds} />
      <h2 className="h1 mt-6 text-center">Neues aus der Umgebung</h2>
      <HomeSwiper swiperId={2} articles={filteredAds} />
      <SwapSchema />
    </div>
  );
};

export default Home;
