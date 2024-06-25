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

  // Funktion, um die passenden Anzeigen für einen Benutzer zu erhalten
  const getMatchingAds = (user) => {
    let matchedAds = ads.filter((ad) => {
      const adOwner = getUserById(ad.user_id);
      return (
        user.pref_cats === ad.ad_cat &&
        adOwner.pref_cats ===
          ads.find((a) => a.user_id === user.user_id)?.ad_cat
      );
    });

    // Eigene Anzeige des Benutzers finden
    let ownAd = ads.find((ad) => ad.user_id === user.user_id);

    // Wenn die eigene Anzeige den Kriterien entspricht, füge sie zu matchedAds hinzu
    if (ownAd && user.pref_cats === ownAd.ad_cat) {
      matchedAds.push({
        ...ownAd,
        my_ad: ownAd.ad_id, // ad_id der eigenen Anzeige
      });
    }

    // Durchsuche die matchedAds und füge eine my_ad-Eigenschaft hinzu
    matchedAds.forEach((ad) => {
      if (ad.ad_id !== ownAd?.ad_id && user.pref_cats.includes(ad.ad_cat)) {
        ad.my_ad = ownAd.ad_id; // ad_id der eigenen Anzeige
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
    let adCat = ad.ad_cat;

    let interestedUsers = users.filter((user) => {
      return (
        user.pref_cats === adCat &&
        ads.find((a) => a.user_id === user.user_id)?.ad_cat === adCat
      );
    });

    return {
      adId: adId,
      adCat: adCat,
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
