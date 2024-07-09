import { useEffect, useState } from "react";
import axios from "axios";

function SwapSchema() {
  const [users, setUsers] = useState([]);
  const [ads, setAds] = useState([]);
  const [myUsers, setMyUsers] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/users/`);
        setUsers(response.data);
        console.log("Fetched users:", response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchAdData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/ads/`);
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
    if (users.length > 0 && ads.length > 0) {
      const getUserById = (id) => {
        return users.find((user) => user._id === id);
      };

      const getMatchingAds = (user) => {
        const ownAds = ads.filter((ad) => ad.user_id === user._id);
        const swap_ads = [];
        const interestAds = [];

        if (
          !user ||
          !user.preferredcats ||
          !user.preferredSubcats ||
          !user.preferredtags
        ) {
          return { swap_ads, interestAds };
        }

        const preferredCatsArray = user.preferredcats
          .split(",")
          .map((cat) => cat.trim());
        const preferredSubcatsArray = user.preferredSubcats
          .split(",")
          .map((subcat) => subcat.trim());
        const preferredTagsArray = user.preferredtags
          .split(",")
          .map((tag) => tag.trim());

        ads.forEach((ad) => {
          const adOwner = getUserById(ad.user_id);

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
            let swapWithAdId = null;
            const ownAd = ownAds.find((ownAd) => ownAd._id !== ad._id);
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
            ad.user_id !== user._id && // Exclude user's own ads
            !swap_ads.some((swapAd) => swapAd._id === ad._id) &&
            (commonCategories.length > 0 ||
              preferredSubcatsArray.includes(ad.subCategory.toString()))
          ) {
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

        return {
          swap_ads,
          interestAds,
        };
      };

      const updatedUsers = users.map((user) => ({
        user_id: user._id,
        name: user.username,
        pref_cats: user.preferredcats,
        swap_ads: getMatchingAds(user).swap_ads,
        interestAds: getMatchingAds(user).interestAds,
      }));

      setMyUsers(updatedUsers);
    }
  }, [users, ads]);

  console.log("Fetched SwapAds:", myUsers);

  return null; // Component doesn't render anything
}

export default SwapSchema;
