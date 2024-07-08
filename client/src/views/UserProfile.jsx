import axios from "axios";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider.jsx";
import HomeSwiper from "../components/HomeSwiper.jsx";

const UserProfile = () => {
  const { isLoggedIn, userData } = useAuth();

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
      <h2 className="h1 mt-6 text-center">Top matches</h2>
      <HomeSwiper swiperId={1} articles={filteredAds} />
      <h2 className="h1 mt-6 text-center"></h2>
      <HomeSwiper swiperId={2} articles={filteredAds} />
    </div>
  );
};
export default UserProfile;
