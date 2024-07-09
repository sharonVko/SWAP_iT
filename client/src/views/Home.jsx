import axios from "axios";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider.jsx";
import HomeSwiper from "../components/HomeSwiper.jsx";
import SwapSchema from "../components/SwapSchema.jsx";

const Home = () => {
  const { userData } = useAuth();
  const [ads, setAds] = useState([]);
  const [interestAds, setInterestAds] = useState([]);
  const [swapAds, setSwapAds] = useState([]);
  const [myNewestAds, setMyNewestAds] = useState([]);

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
      // Filter out user's ads
      const filteredInterestAds = ads.filter(
        (ad) => ad.user_id !== userData._id
      );

      // Sort by timestamp (newest first) and limit to 20 ads
      filteredInterestAds.sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
      );
      const newestAds = filteredInterestAds.slice(0, 20);

      // Set interestAds state
      setMyNewestAds(newestAds);
    }
  }, [userData, ads]);

  console.log("----->>>", myNewestAds);

  return (
    <div className="pb-12">
      {/* Pass setSwapAds and setInterestAds as props to SwapSchema */}
      <SwapSchema setInterestAds={setInterestAds} setSwapAds={setSwapAds} />
      <h1 className="text-center">Deine Tauschangebote</h1>
      {/* Display user's ads with filteredAds */}
      <HomeSwiper swiperId={1} articles={ads} />

      <h2 className="h1 mt-8 text-center">Das könnte dir gefallen</h2>
      {/* Display interestAds under "Das könnte dir gefallen" */}
      <HomeSwiper swiperId={2} articles={interestAds} />
      <button className="block btn-teal btn-md mx-auto mt-4">
        Mehr Angebote
      </button>

      <h2 className="h1 mt-8 text-center">Neue Angebote</h2>
      {/* Display newest 20 articles under "Neue Angebote" */}
      <HomeSwiper swiperId={3} articles={myNewestAds.slice(0, 20)} />
      <button className="block btn-teal btn-md mx-auto mt-4">
        Mehr Angebote
      </button>
    </div>
  );
};

export default Home;
