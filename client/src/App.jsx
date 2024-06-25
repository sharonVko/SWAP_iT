import React from "react";
import { categories } from "./utils/categories.js";
import { users } from "./utils/users.js";
import { ads } from "./utils/ads.js";

function App() {
  const getCategories = (id = 0) => {
    return categories.filter((category) => category.parent === id);
  };

  const getUserById = (id) => {
    return users.find((user) => user.user_id === id);
  };

  const getMatchingAds = (user) => {
    // Find the user's own ad
    const ownAd = ads.find((ad) => ad.user_id === user.user_id);

    // Filter ads based on user and ad owner preferences
    const matchedAds = ads.filter((ad) => {
      const adOwner = getUserById(ad.user_id);

      // Check if ad.ad_cat is an array, if not, convert it to an array
      const adCategories = Array.isArray(ad.ad_cat) ? ad.ad_cat : [ad.ad_cat];

      return (
        // Check if user's pref_cats intersect with ad's ad_cat and vice versa
        user.pref_cats.some((cat) => adCategories.includes(cat)) &&
        adOwner.pref_cats.some((cat) => user.pref_cats.includes(cat)) &&
        ad.user_id !== user.user_id // Exclude user's own ads
      );
    });

    // Add own ad to matchedAds if it matches user's preferences
    if (ownAd && user.pref_cats.includes(ownAd.ad_cat)) {
      matchedAds.push({
        ...ownAd,
        my_ad: ownAd.ad_id, // ad_id of the user's own ad
      });
    }

    // Add `my_ad` property to each matched ad, except the user's own ad
    matchedAds.forEach((ad) => {
      if (ad.ad_id !== ownAd?.ad_id && user.pref_cats.includes(ad.ad_cat)) {
        ad.my_ad = ownAd.ad_id; // ad_id of the user's own ad
      }
    });

    return matchedAds;
  };

  // Liste der Benutzer mit ihren passenden Anzeigen
  const myUsers = users.map((user) => {
    let matchedAds = getMatchingAds(user);
    let ownAd = ads.find((ad) => ad.user_id === user.user_id);

    return {
      user_id: user.user_id,
      name: user.name,
      pref_cats: user.pref_cats,
      matchedAds: matchedAds, // Hier werden die passenden Anzeigen gespeichert
    };
  });

  // Liste der Anzeigen mit den Benutzern, die daran interessiert sind
  const myAds = ads.map((ad) => {
    let adId = ad.ad_id;
    let adUserId = ad.user_id;
    let adUserName = getUserById(ad.user_id).name;

    // Convert ad.ad_cat to an array if it's not already
    const adCategories = Array.isArray(ad.ad_cat) ? ad.ad_cat : [ad.ad_cat];

    // Filter users interested in this ad, excluding the ad owner
    let interestedUsers = users.filter((user) => {
      // Check if ad.ad_cat is defined and is an array before using .some()
      return (
        Array.isArray(ad.ad_cat) &&
        ad.ad_cat.some((cat) => user.pref_cats.includes(cat)) &&
        ads
          .find((a) => a.user_id === user.user_id)
          ?.ad_cat.some((cat) => adCategories.includes(cat)) &&
        user.user_id !== adUserId // Exclude ad owner
      );
    });

    return {
      adId: adId,
      adCat: adCategories,
      adUserId: adUserId,
      adUserName: adUserName,
      interestedUsers: interestedUsers, // Hier werden die interessierten Benutzer gespeichert
    };
  });

  console.log(myAds); // Anzeigen mit interessierten Benutzern
  console.log(myUsers); // Benutzer mit passenden Anzeigen

  return (
    <>
      <h1>Alle Ads</h1>
      {ads.map((ad, i) => (
        <p key={i}>{ad.ad_id}</p>
      ))}
    </>
  );
}

export default App;
