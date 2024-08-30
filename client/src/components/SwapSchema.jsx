import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthProvider.jsx";
import { tags } from "../utils/tags.js"

function SwapSchema({ setInterestAds, setSwapAds }) {
  const { userData } = useAuth(); // Accessing user data from AuthProvider
  const [users, setUsers] = useState([]);
  const [ads, setAds] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/`);
        setUsers(response.data);
        console.log("Fetched users:", response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchAdData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/ads/`);
        setAds(response.data);
        console.log("Fetched ads:", response.data);
      } catch (error) {
        console.error("Error fetching ad data:", error);
      }
    };

    fetchUserData();
    fetchAdData();
  }, []);

  useEffect(() => {
    if (users.length > 0 && ads.length > 0 && userData) {
      const getUserById = (id) => {
        return users.find((user) => user._id === id);
      };

      const getMatchingAds = (user) => {
        const ownAdIds = user.ads.map((ad) => ad.toString()); // Convert ObjectIds to strings
        const swap_ads = [];
        const interestAds = [];

        if (
          !user ||
          !user.preferredcats ||
          !user.preferredSubcats ||
          !user.preferredtags
        ) {
          console.log("Invalid user or missing preferences:", user);
          return { swap_ads, interestAds };
        }

        console.log("User preferences:", {
          preferredcats: user.preferredcats,
          preferredSubcats: user.preferredSubcats,
          preferredtags: user.preferredtags,
        });

        const preferredCatsArray = user.preferredcats
          .split(",")
          .map((cat) => cat.trim());
        const preferredSubcatsArray = user.preferredSubcats
          .split(",")
          .map((subcat) => subcat.trim());

        // const preferredTagsArray = user.preferredtags
        //   .split(",")
        //   .map((tag) => tag.trim());
				const preferredTagsArray = user.preferredtags
					.split(",")
					.map((tagId) => tags.filter(item => item.tag_id === parseInt(tagId))[0].name);

        console.log("Preferred categories:", preferredCatsArray);
        console.log("Preferred subcategories:", preferredSubcatsArray);
        console.log("Preferred tags:", preferredTagsArray);

        ads.forEach((ad) => {
          console.log("Checking ad:", ad);

          // Skip user's own ads
          if (ownAdIds.includes(ad._id.toString())) {
            console.log(`Skipping own ad: ${ad._id}`);
            return;
          }

          const adCategories = Array.isArray(ad.categories)
            ? ad.categories
            : [ad.categories];
          const commonCategories = preferredCatsArray.filter((cat) =>
            adCategories.includes(cat)
          );
          const commonTags = ad.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => preferredTagsArray.includes(tag));

          let match_type = "";
          if (
            commonCategories.length > 0 &&
            ad.subCategory &&
            preferredSubcatsArray.includes(ad.subCategory.toString())
          ) {
            if (commonTags.length >= 3) {
              match_type = "Diamond";
            } else if (commonTags.length === 2) {
              match_type = "Gold";
            } else if (commonTags.length === 1) {
              match_type = "Silver";
            }
          }

          // Add to swap_ads if match_type is set
          if (
            (match_type === "Diamond" && commonTags.length >= 3) ||
            (match_type === "Gold" && commonTags.length === 2) ||
            (match_type === "Silver" && commonTags.length === 1)
          ) {
            console.log(`Adding to swap_ads: ${ad._id}`);
            let swapWithAdId = null;
            const ownAd = user.ads.find((ownAd) => ownAd._id !== ad._id); // Corrected here
            if (ownAd) {
              swapWithAdId = ownAd._id;
            }
            swap_ads.push({
              ...ad,
              match_type,
              swap_with_ad: swapWithAdId,
            });
          }

          // Add to interestAds if it meets the conditions
          if (
            !swap_ads.some((swapAd) => swapAd._id === ad._id) &&
            (commonCategories.length > 0 ||
              preferredSubcatsArray.includes(ad.subCategory.toString()))
          ) {
            console.log(`Adding to interestAds: ${ad._id}`);
            interestAds.push({
              ...ad,
              match_type: "", // No match type for interestAds
              score:
                (commonCategories.length > 0 ? 1 : 0) +
                (preferredSubcatsArray.includes(ad.subCategory.toString())
                  ? 1
                  : 0),
            });
          }
        });

        // Sort interestAds by score
        interestAds.sort((a, b) => b.score - a.score);

        console.log("Final swap_ads:", swap_ads);
        console.log("Final interestAds:", interestAds);

        return {
          swap_ads,
          interestAds,
        };
      };

      const currentUser = users.find((user) => user._id === userData._id);
      if (currentUser) {
        const { swap_ads, interestAds } = getMatchingAds(currentUser);

        console.log("Fetched swap_ads:", swap_ads);
        console.log("Fetched interestAds:", interestAds);
        setInterestAds(interestAds);
        setSwapAds(swap_ads);
      }
    }
  }, [users, ads, userData, setInterestAds, setSwapAds]);

  return null; // Component doesn't render anything
}

export default SwapSchema;
