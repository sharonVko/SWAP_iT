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
    const matchedAds = [];

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
        matchedAds.push({
          ...ad,
          match_type,
        });
      }
    });

    if (ownAd && user.pref_cats.includes(ownAd.ad_cat)) {
      matchedAds.push({
        ...ownAd,
        match_type: "",
      });
    }

    return matchedAds;
  };

  const myUsers = users.map((user) => ({
    user_id: user.user_id,
    name: user.name,
    pref_cats: user.pref_cats,
    matchedAds: getMatchingAds(user),
  }));

  console.log(myUsers); // Output to check matchedAds for each user

  return null; // Komponente rendert nichts
}

export default SwapSchema;
