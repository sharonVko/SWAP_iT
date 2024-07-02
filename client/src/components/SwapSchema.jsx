import React from "react";
import { categories } from "../utils/categories.js";
import { users } from "../utils/users.js";
import { ads } from "../utils/ads.js";

function SwapSchema() {
  const getCategories = (id = 0) => {
    return categories.filter((category) => category.parent === id);
  };

  const getUserById = (id) => {
    return users.find((user) => user.user_id === id);
  };

  const getMatchingAds = (user) => {
    const ownAd = ads.find((ad) => ad.user_id === user.user_id);
    const swap_ads = [];
    const interestAds = [];

    ads.forEach((ad) => {
      const adOwner = getUserById(ad.user_id);

      // Convert ad.ad_cat to an array if it's not already
      const adCategories = Array.isArray(ad.ad_cat) ? ad.ad_cat : [ad.ad_cat];
      const commonCategories = user.pref_cats.filter((cat) =>
        adCategories.includes(cat)
      );
      const commonTags = ad.tags.filter((tag) => user.pre_tags.includes(tag));

      let match_type = "";
      if (
        commonCategories.length > 0 &&
        ad.ad_child_cat &&
        user.pref_child_cats.includes(ad.ad_child_cat)
      ) {
        if (commonTags.length >= 2) {
          match_type = "Diamond";
        } else if (commonTags.length === 1) {
          match_type = "Gold";
        } else {
          match_type = "Silver";
        }
      }

      if (
        (match_type === "Diamond" && commonTags.length >= 2) ||
        (match_type === "Gold" && commonTags.length === 1) ||
        (match_type === "Silver" && commonTags.length === 0)
      ) {
        swap_ads.push({
          ...ad,
          match_type,
          swap_with_ad: ownAd ? ownAd.ad_id : null,
        });
      }

      // Collect all interest ads regardless of match type and exclude own ads and ads in swap_ads
      if (
        ad.user_id !== user.user_id && // Exclude own ads
        !swap_ads.some((swapAd) => swapAd.ad_id === ad.ad_id) && // Exclude ads in swap_ads
        (commonCategories.length > 0 ||
          user.pref_child_cats.includes(ad.ad_child_cat) ||
          commonTags.length > 0)
      ) {
        interestAds.push({
          ...ad,
          match_type,
          score:
            (commonCategories.length > 0 ? 1 : 0) +
            (user.pref_child_cats.includes(ad.ad_child_cat) ? 1 : 0) +
            commonTags.length,
        });
      }
    });

    // Sort interestAds by score in descending order
    interestAds.sort((a, b) => b.score - a.score);

    if (ownAd && user.pref_cats.includes(ownAd.ad_cat)) {
      swap_ads.push({
        ...ownAd,
        match_type: "",
        swap_with_ad: ownAd ? ownAd.ad_id : null,
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

  const myUsers = users.map((user) => ({
    user_id: user.user_id,
    name: user.name,
    pref_cats: user.pref_cats,
    swap_ads: getMatchingAds(user).swap_ads,
    interestAds: getMatchingAds(user).interestAds,
  }));

  console.log(myUsers); // Output to check swap_ads and interestAds for each user

  return null; // Komponente rendert nichts
}

export default SwapSchema;
