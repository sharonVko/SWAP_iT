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
        const ownAd = ads.find((ad) => ad.user_id === user._id);
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

          if (
            (match_type === "Diamond" && commonTags.length >= 3) ||
            (match_type === "Gold" && commonTags.length === 2) ||
            (match_type === "Silver" && commonTags.length === 1)
          ) {
            swap_ads.push({
              ...ad,
              match_type,
              swap_with_ad: ownAd ? ownAd._id : null,
            });
          }

          if (
            ad.user_id !== user._id &&
            !swap_ads.some((swapAd) => swapAd._id === ad._id) &&
            (commonCategories.length > 0 ||
              preferredSubcatsArray.includes(ad.subCategory.toString()) ||
              commonTags.length > 0)
          ) {
            interestAds.push({
              ...ad,
              match_type,
              score:
                (commonCategories.length > 0 ? 1 : 0) +
                (preferredSubcatsArray.includes(ad.subCategory.toString())
                  ? 1
                  : 0) +
                commonTags.length,
            });
          }
        });

        interestAds.sort((a, b) => b.score - a.score);

        if (ownAd && preferredCatsArray.includes(ownAd.categories.toString())) {
          swap_ads.push({
            ...ownAd,
            match_type: "",
            swap_with_ad: ownAd ? ownAd._id : null,
          });
          interestAds.push({
            ...ownAd,
            match_type: "",
            score: 0,
          });
        }

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
